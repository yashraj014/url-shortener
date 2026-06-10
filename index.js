import express from 'express'
import mongoose from 'mongoose'
import router from './router/url.js'
import connectMongoDb from './connection.js'

const app = express()

app.use(express.json({extended:false}))

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener")

const PORT=8000;

app.get('/',(req,res)=>{
    return res.json({message:"Server is ready"})
})

app.use("/url",router);

app.listen(PORT,()=>{
    console.log("Server running on port",PORT)
})

