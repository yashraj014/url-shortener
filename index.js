import express from 'express'
import mongoose from 'mongoose'
import router from './router/url.js'
import staticRoute from './router/staticRoute.js'
import connectMongoDb from './connection.js'
import URL from './models/url.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs");

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener")

const PORT=8000;


app.use("/url",router);
app.use('/',staticRoute);


app.listen(PORT,()=>{
    console.log("Server running on port",PORT)
})

