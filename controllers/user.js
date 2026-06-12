import express from 'express'
import User from '../models/users.js'
import { v4 as uuidv4 } from "uuid";
import { setUser} from '../services/auth.js'
export const handleUserSingup = async(req,res)=>{
    const {name,email,password}=req.body;

    await User.create({
        name,
        email,
        password
    })

    return res.redirect('/login'); 
}

export const handleUserLogin = async(req,res)=>{
   const {email,password}=req.body;

  const user = await User.findOne({
    email,
    password
   })
   if(!user) return res.render("login",{error:"Invalid Credentials"})
    const sessionId = uuidv4();
    setUser(sessionId,user);
   res.cookie('sessionID', sessionId);
    return res.redirect('/')

}