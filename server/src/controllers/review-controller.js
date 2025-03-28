import Review from '../models/reviews-model.js'
import { validationResult } from "express-validator";

// CREATE REVIEW
export const createReview = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const {
      name,
      Designation,
      Testimonial_text,
      rating,
      review,
      profile_photo,
    } = req.body;

    const newReview = new Review({
      name,
      Designation,
      Testimonial_text,
      rating,
      review,
      profile_photo,
    });
    await newReview.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Review submitted successfully",
        data: newReview,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
