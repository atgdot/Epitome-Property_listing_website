import express from 'express';
import { adminAuthController , adminLogoutController } from '../controllers/adminLogin-controller.js';
import auth from '../middleware/authMiddlware.js'
const router = express.Router(); 


router.post('/login',  adminAuthController);
router.post('/logout', auth, adminLogoutController);

export default router;