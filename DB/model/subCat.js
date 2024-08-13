import mongoose, { Types, Schema, model } from "mongoose";
const AddSubCat = new Schema({
    image: {
        type: [String],
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    classificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'basicClassification'
    }
})
const subCat = model('subCat', AddSubCat)
export { subCat }