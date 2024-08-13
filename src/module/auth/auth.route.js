import { Router } from "express";
import * as auth from './controller/auth.controller.js'
import { validation } from './../../middleware/validation.js';
import * as authValidation from '../auth/auth.validation.js'
const authRouter = Router()
authRouter.post('/signup', validation(authValidation.signup), auth.signup)
authRouter.post('/signin', validation(authValidation.signin), auth.signin)
export default authRouter
