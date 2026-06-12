import express from 'express'
import mongoose from 'mongoose'
import router from './router/url.js'
import staticRoute from './router/staticRoute.js'
import userRoute from './router/user.js'
import connectMongoDb from './connection.js'
import URL from './models/url.js'
import cookieParser from 'cookie-parser'
import { restrictToLoggedInUserOnly,checkAuth } from './middlewares/auth.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.set("view engine","ejs");

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener")

const PORT=8000;

app.use("/url",restrictToLoggedInUserOnly,router);
app.use('/',checkAuth,staticRoute);
app.use('/users',userRoute)

app.listen(PORT,()=>{
    console.log("Server running on port",PORT)
})

