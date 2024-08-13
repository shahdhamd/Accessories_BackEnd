import Joi from "joi";
export const signup = {
    body: Joi.object({
        userName: Joi.string().required().min(2).max(30).messages({
            'string.min': "يجب ان يكون اسم المستخدم على الاقل حرفان ",
            'string.max': "يجب ان يكون اسم المستخدم على الاكثر 30 حرف"
        }),
        email: Joi.string().email().required().messages({
            'string.email': "يرجى ادخال عنوان بريد الكتروني صحيح"
        }),
        password: Joi.string().required().min(3).messages({
            'string.min': 'يجب ان تتكون كلمة المرور من 3 احرف على الاقل'
        })
    }).required()
};

export const signin = {
    body: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': "يرجى ادخال عنوان بريد الكتروني صحيح"
        }),
        password: Joi.string().required().messages({
            'string.min': " يرجى ادخال عنوان  كلمة المرور صحيح"
        })
    }).required()
};