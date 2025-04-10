import express from 'express';
import { submitEnquiry } from '../controllers/enquiry_controller.js';
import auth from '../middleware/authMiddlware.js'
const router = express.Router();

router.post('/submit', auth, submitEnquiry);

export default router;
