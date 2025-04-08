import Recommendation from "../models/recommendationCard-model.js";
import { validationResult } from "express-validator";



// Get all recommendations
export const createRecommendationCard = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { property_Title, Address, Image_url, upload_image } = req.body;

    // ✅ Create and save the recommendation
    const recommendation = await Recommendation.create({
      property_Title,
      Address,
      Image_url: Image_url || null,
      upload_image: upload_image || null,
    });

    res.status(201).json({ 
      success: true, 
      message: "Recommendation created successfully", 
      data: recommendation 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Recommendation by ID
export const deleteRecommendationCard = async (req, res) => {
  try {
    const { id } = req.params;
    const recommendation = await Recommendation.findByIdAndDelete(id);

    if (!recommendation) {
      return res.status(404).json({ success: false, message: "Recommendation not found" });
    }

    res.status(200).json({ success: true, message: "Recommendation deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};