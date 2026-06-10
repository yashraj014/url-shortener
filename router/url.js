import express from 'express'
import { handleCreateShortId,handleGetUrl,handleGetAnalytics } from '../controllers/url.js';

const router = express.Router()

router.post("/",handleCreateShortId);

router.get("/:shortId",handleGetUrl);

router.get('/analytics/:shortId',handleGetAnalytics);

export default router;