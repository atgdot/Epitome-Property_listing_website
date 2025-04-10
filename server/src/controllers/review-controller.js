import Review from '../models/reviews-model.js'
import { validationResult } from "express-validator";
import { v2 as cloudinary } from "cloudinary";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    // Log the received data
 
    const {
      name,
      Designation,
      Testimonial_text,
      rating,
    } = req.body;

    // Get the Cloudinary URL from the uploaded file
    const profile_photo = req.file ? req.file.path : null;

    // Create new review with parsed rating
    const newReview = new Review({
      name,
      Designation,
      Testimonial_text,
      rating: parseInt(rating), // Ensure rating is an integer
      profile_photo,
    });
    
    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: newReview,
    });
  } catch (error) {
    console.error('Review creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Error creating review" 
    });
  }
};


export const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message
    });
  }
};

// DELETE REVIEW BY ID
export const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the review exists
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    // Delete the review
    await Review.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message
    });
  }
};
