import express from "express";
import { createReview, getAllReview, deleteReviewById } from "../controllers/review-controller.js";
import { check } from "express-validator";
import parser from "../middleware/multer.js";
import auth from '../middleware/authMiddlware.js'

const router = express.Router();

router.post(
  "/add",auth,
  parser.single('profile_photo'), // Use the Cloudinary parser instead of basic multer
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("Designation").notEmpty().withMessage("Designation is required"),
    check("Testimonial_text").notEmpty().withMessage("Testimonial text is required"),
    check("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  ],
  createReview
);

router.get("/all", getAllReview);

router.delete("/:id",auth, deleteReviewById);

export default router;