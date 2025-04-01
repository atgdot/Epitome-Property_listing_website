import express from 'express';
import { submitEnquiry } from '../controllers/enquiry_controller.js';

const router = express.Router();

router.post('/submit', submitEnquiry);

export default router;
