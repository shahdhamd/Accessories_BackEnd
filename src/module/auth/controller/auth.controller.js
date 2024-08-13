import { UserModel } from "../../../../DB/model/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await UserModel.findOne({ email: email })
        if (user) {
            return res.json("تم تسجيل هذا البريد الإلكتروني مسبقًا");

        } else {
            const hash = bcrypt.hashSync(password, parseInt(process.env.saltRound))
            const newUser = await UserModel({ userName, email, password: hash })
            const saveUser = await newUser.save()
            if (saveUser) {
                return res.status(200).json({ message: "succsses", saveUser })
            } else {
                return res.json('فشل انشاء الحساب')
            }

        }
    } catch (error) {
        res.json({ message: `catch error  ${error}` })
    }
}
// export const register = async (req, res) => {
//     const { userName, password, email } = req.body
//     try {
//         const exist = await UserModel.findOne({ email });
//         if (exist) {
//             return res.json({ success: false, message: 'user already exist' })
//         }


//         if (password.length < 3) {
//             return res.json({ success: false, message: 'please enter strong password' })

//         }
//         //hashing user password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);
//         const newUser = new UserModel({
//             userName: userName,
//             email: email,
//             password: hashPassword,
//             cartData:{}
//         })

//         const user = await newUser.save();
//         return res.json({ success: true, user })
//     } catch (error) {
//         console.log(error);
//         return res.json({ success: false, message: 'Error' })
//     }
// }




export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json('هذا البريد الإلكتروني غير مسجل')

        } else {
            const match = bcrypt.compare(password, user.password)
            if (!match) {
                res.json('يرجى التأكد من صحة كلمة المرور ')
            } else {

                const token = jwt.sign({ id: user._id, email, userName: user.userName, role: user.role }, process.env.TokenSignIn, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({ message: "sucsses", token })
            }
        }
    } catch (error) {
        res.json(`catch error ${error}`)
    }

}

