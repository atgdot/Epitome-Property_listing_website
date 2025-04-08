import express from "express";
import { createReview, getAllReview } from "../controllers/review-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/add",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("Designation").notEmpty().withMessage("Designation is required"),
    check("Testimonial_text").notEmpty().withMessage("Testimonial text is required"),
    check("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    check("profile_photo").notEmpty().withMessage("Profile photo is required"),
  ],
  createReview
);
router.get("/all",getAllReview)



export default router;