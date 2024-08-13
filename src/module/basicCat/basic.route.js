import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from "./basic.endpoint.js";
import { fileValidation, HME, myMulter } from './../../services/multer.js';
import * as basicRoute from './controller/basic.controller.js'
const basicRouter = Router()
basicRouter.post('/add', auth(endpoint.addBasic), myMulter(fileValidation.image).single('image'), basicRoute.addBasicClass)
basicRouter.delete('/delet/:id', auth(endpoint.deletBasic), basicRoute.deletBasic)
basicRouter.get('/find', basicRoute.showAll)
basicRouter.patch('/update/:id', auth(endpoint.update), myMulter(fileValidation.image).single('image'), basicRoute.update)
basicRouter.post('/add/:classificationId', auth(endpoint.addSub), myMulter(fileValidation.image).array('image', 5), basicRoute.addCatToBasic)
basicRouter.delete('/delet/:basicId/:subId', auth(endpoint.deletSub), basicRoute.deletSubFrombasic)
basicRouter.get('/all/:id', basicRoute.showAllsub)
basicRouter.get('/sub/:id', basicRoute.showSub)
basicRouter.patch('/update/:basicId/:subId', myMulter(fileValidation.image).array('image', 5), HME, basicRoute.updateSub)
basicRouter.get('/all', basicRoute.AllProduct)
basicRouter.get('/name/:id', basicRoute.getNameCategore)
export default basicRouter