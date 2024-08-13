import { Types, Schema, model, now } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    cartData: {
        type: Object,
        default: {},
        required:true
    }
});

const UserModel = model('user', userSchema)
export { UserModel }