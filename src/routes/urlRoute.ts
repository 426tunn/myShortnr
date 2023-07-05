import express from 'express';
import { getShortUrls, createShortUrl, redirectToFullUrl, generateQRCode } from '../controllers/linkControllers';
import { validateUserMW } from '../middleware/MW';

const router = express.Router();


router.get('/', validateUserMW, getShortUrls); 
// router.get('useer-transaction-history',  validateUserMW)
router.post('/shortUrls', validateUserMW, createShortUrl);
router.get('/:shortUrl', validateUserMW, redirectToFullUrl);
router.get('/generateqrcode', generateQRCode);

export default router;
 


