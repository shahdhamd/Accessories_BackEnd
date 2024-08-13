import { Router } from "express";
import * as bagRouter from './controller/bag.controller.js'
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./bag.endpoint.js";
const Bagrouter = Router()
Bagrouter.post('/add', auth(endpoints.add), bagRouter.AddToBag)
Bagrouter.patch('/addCart', auth(endpoints.add), bagRouter.addToCartFromLocalstorage)
Bagrouter.delete('/delete', auth(endpoints.delet), bagRouter.deletFrombag)
Bagrouter.delete('/deleteItem', auth(endpoints.delet), bagRouter.deleteItemFromCart)
Bagrouter.get('/get', auth(endpoints.show), bagRouter.getCart)

export default Bagrouter