import express from 'express';
import { urlShortener, getRedirectOriginalUrl, getUrl } from '../controllers/url.controller.js';
import { isAuth } from '../middleware/auth.middleware.js';
import limiter from '../middleware/limit.js';

const router = express.Router();

router.post('/urlShort',limiter,urlShortener);
router.get('/redirect/:shortId',getRedirectOriginalUrl);
router.get('/user/:id',isAuth,getUrl);

export default router;