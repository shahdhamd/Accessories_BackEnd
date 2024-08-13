
import mongoose, { Schema, model } from "mongoose"
const basicClassification = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    Subcategories: {
        type: Array,
        ref: "subCat"
    },

})
const basic = model('basicClassification', basicClassification)
export { basic }