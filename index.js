import express from 'express';
import cors from 'cors';
import * as indexRouter from './src/module/index.route.js'
import dotenv from 'dotenv'

import connectDB from './DB/connection.js';
const app=express();
dotenv.config();
connectDB()
app.use(express.json())
app.use(cors())
app.use(`${process.env.BaseUrl}auth`, indexRouter.authRouter)
app.use(`${process.env.BaseUrl}basic`, indexRouter.basicRouter)
app.use(`${process.env.BaseUrl}cart`,indexRouter.Bagrouter)
app.use('*',(req,res)=>{
res.status(400).json({message:"invalid page"})

})
app.listen(process.env.port,(req,res)=>{
    console.log(`Running server  ${process.env.port}`)
})
