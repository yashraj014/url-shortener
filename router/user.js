import express from 'express'
import { handleUserSingup,handleUserLogin } from '../controllers/user.js'
const router = express.Router()

router.post("/",handleUserSingup)

router.post('/login',handleUserLogin)

export default router