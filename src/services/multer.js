import multer from 'multer'
import {nanoid} from 'nanoid'
export function myMulter(customvalidation){ 
    const storage = multer.diskStorage({
        filename: function(req, file, cb){
            cb(null, Date.now() + '_' + nanoid() + '_' + file.originalname);
        }
    });
    
    function fileFilter(req, file, cb){
        if (customvalidation.includes(file.mimetype)){ 
            cb(null, true);  
        } else {
            cb('invalid file type', false);
        }
    }
        
    const upload = multer({ 
        storage: storage,
        fileFilter: fileFilter
    });

    return upload;
}

export const fileValidation = { 
    image: ['image/png', 'image/jpeg','image/jpg']
}

export const HME = (error, req, res, next) => { 
    if (error) {
        res.status(400).json({ message: 'multer error hhh', error });
    } else {
        next();
    }
}