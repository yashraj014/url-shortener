import express from 'express'
import { nanoid } from 'nanoid'
import URL from '../models/url.js';
export const handleCreateShortId = async(req,res)=>{
    const body = req.body;
    if(!body) return res.status(400).json({errpr:"url is required"})
    const shortId = nanoid(8);
    const result = await URL.create({
    shortId:shortId,
    redirectURL: body.url,
    visitHistory:[]
   })
  return res.status(201).json({
    message:"success",
    shortId: result.shortId
  })
}

export const handleGetUrl =async(req,res)=>{
    try{
        const result = await URL.findOneAndUpdate({
            shortId: req.params.shortId
        },
        {
            $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
        if(!result){
           return res.status(404).json({
                message:"url not found"
            })
        }
        res.redirect(result.redirectURL);
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            message:"invalid shortId"
        })
    }
    
}

export const handleGetAnalytics = async(req,res)=>{
    try{
        const result = await URL.findOne({
            shortId:req.params.shortId
        })
        if(!result) return res.status(404).json({message:"url not found"})
        return res.status(200).json({
          totalClicks:result.visitHistory.length,
          analytics:result.visitHistory
        })
    }
    catch(err){
        return res.status(500).json({error:"some error occured"})
    }
}