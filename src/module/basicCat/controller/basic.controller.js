import { basic } from "../../../../DB/model/BasicClassification.js";
import { subCat } from "../../../../DB/model/subCat.js";
import cloudinary from './../../../services/cloudenary.js';

export const addBasicClass = async (req, res) => {
    try {
        const { name } = req.body;
        const findBasic = await basic.findOne({ name });

        if (findBasic) {
            return res.json({ message: "هذا التصنيف موجود مسبقا" });
        }

        if (!req.file) {
            return res.json({ message: "الصورة مطلوبة " });
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: 'cat/image/' });
        req.body.image = secure_url;
        const AddClass = await basic.create(req.body);

        if (!AddClass) {
            return res.json({ message: "خطا في الاضافة" });
        }

        res.status(200).json({ message: "تمت الاضافة بنجاح", AddClass });
    } catch (error) {
        return res.status(500).json({ message: `catch error ${error}` });
    }
};

export const deletBasic = async (req, res) => {
    const { id } = req.params;
    const deletBasic = await basic.findByIdAndDelete(id);
    if (!deletBasic) {
        res.status(400).json({ message: "فشل في عملية الحذف" });
    } else {
        res.status(200).json({ message: "تمت عملية الحذف" });
    }
}

export const showAll = async (req, res) => {
    const findAll = await basic.find({});
    if (!findAll) {
        res.status(400).json({ message: "لا يوجد نتائج" });
    } else {
        res.status(200).json({ message: "النتائج", findAll });
    }
}

export const update = async (req, res) => {
    try {
        const { name, image } = req.body;
        const { id } = req.params;

        const findBasic = await basic.findById(id);
        if (!findBasic) {
            return res.status(404).json({ message: "التصنيف غير موجود" });
        }

        const updatedData = {
            name: name || findBasic.name,
        };

        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: 'sub/image/' });
            updatedData.image = secure_url;
        } else {
            updatedData.image = findBasic.image;
        }

        const updateBasic = await basic.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

        if (!updateBasic) {
            return res.status(400).json({ message: "فشل في عملية التحديث" });
        } else {
            res.status(200).json({ message: "تم التحديث بنجاح", updateBasic });
        }
    } catch (error) {
        return res.status(500).json({ message: `Catch error ${error}` });
    }
}

export const addCatToBasic = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) { // Check if there are any files uploaded
            console.log('No image');
            return res.status(400).json({ message: "اضف صورة للخدمة" });
        } else {
            const { description, price } = req.body;
            const { classificationId } = req.params;

            const images = [];
            for (const file of req.files) { // Loop through the uploaded files
                const { secure_url } = await cloudinary.uploader.upload(file.path, { folder: 'sub/image/' }); // Use file.path
                images.push(secure_url);
            }

            console.log(images);

            const newSub = await subCat.create({
                image: images,
                description,
                price,
                classificationId
            });

            const updateSub = await basic.findOneAndUpdate(
                { _id: classificationId },
                { $push: { Subcategories: newSub } },
                { new: true }
            );

            if (!updateSub) {
                return res.status(400).json({ message: "فشل في إضافة الفئة الفرعية إلى الفئة الأساسية" });
            }

            res.status(200).json({ message: "تمت الاضافة بنجاح", updateSub });
        }
    } catch (error) {
        res.status(500).json({ message: `catch error ${error.message}` }); // Format error message
    }
};


export const deletSubFrombasic = async (req, res) => {
    try {
        const { basicId, subId } = req.params;
        const findSub = await subCat.findById(subId);
        if (!findSub) {
            res.status(400).json({ message: "مش موجود" })
        } else {
            const deletfromsub = await subCat.findByIdAndDelete(subId)
            const delet = await basic.findByIdAndUpdate(basicId, { $pull: { Subcategories: findSub } }, { new: true })
            if (delet) {
                res.status(200).json({ message: "تم الحذف بنجاح", delet })
            } else {
                res.status(400).json({ message: "فشل في حذف المودل" })
            }
        }



    } catch (error) {
        res.status(500).json({ message: `catch error  ${error}` })
    }
}

export const showAllsub = async (req, res) => {
    const { id } = req.params
    const findBasic = await basic.findById(id)
    if (!findBasic) {
        res.status(404).json({ message: "مش متوفرة" })
    } else {
        res.status(200).json({ findBasic })
    }
}

export const AllProduct = async (req, res) => {
    const findAll = await subCat.find({});
    res.status(200).json({ success: false, findAll })

}

export const showSub = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const findSub = await subCat.findById(id);
    if (!findSub) {
        res.status(404).json({ message: "مش متوفرة" })
    } else {
        res.status(200).json({ findSub })
    }
}

export const updateSub = async (req, res) => {
    const { updateDes, updateprice } = req.body;
    const { basicId, subId } = req.params;

    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        if (!updateDes && !updateprice && (!req.files || req.files.length === 0)) {
            return res.status(400).json({ message: "No update fields provided" });
        }

        const findSub = await subCat.findById(subId);
        if (!findSub) {
            return res.status(400).json({ message: "غير موجود" });
        }

        const updateFields = {};
        if (updateDes) updateFields.description = updateDes;
        if (updateprice) updateFields.price = updateprice;

        if (req.files && req.files.length > 0) {
            const images = [];
            for (const file of req.files) {
                const { secure_url } = await cloudinary.uploader.upload(file.path, { folder: 'sub/image/' });
                images.push(secure_url);
            }
            updateFields.image = images;
        }

        const updatedSub = await subCat.findByIdAndUpdate(subId, { $set: updateFields }, { new: true });

        const findBasic = await basic.findById(basicId);
        const subIndex = findBasic.Subcategories.findIndex(sub => sub && sub._id.toString() === subId);
        if (subIndex > -1) {
            findBasic.Subcategories[subIndex] = updatedSub;
        }
        const findUpdate = await basic.findByIdAndUpdate(basicId, { Subcategories: findBasic.Subcategories }, { new: true });

        return res.status(200).json({ message: "تم تحديث بنجاح", findUpdate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "حدث خطأ ما أثناء تحديث" });
    }
};

export const getNameCategore = async (req, res) => {
    const { id } = req.params;
    const findCategore = await basic.findById(id)
    if (!findCategore) {
        res.json('خطا')
    } else {
        res.json(findCategore.name)
    }
}

