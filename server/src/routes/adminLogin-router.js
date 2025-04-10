import express from 'express';
import { adminAuthController , adminLogoutController, verifyTokenController } from '../controllers/adminLogin-controller.js';
import auth from '../middleware/authMiddlware.js'
const router = express.Router(); 


router.post('/login',  adminAuthController);
router.post('/logout', auth, adminLogoutController);
router.get("/verify-token", auth,verifyTokenController)

export default router;