import Recommendation from "../models/recommendationCard-model.js";
import {
  BasicProperty,
  PropertyLocation,
  PropertyMedia,
} from "../models/addproperty-model.js";
import { validationResult } from "express-validator";

// Create Recommendation (store only property ID)
export const createRecommendationCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { propertyId } = req.body;

    // Check if property exists
    const property = await BasicProperty.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    const recommendation = await Recommendation.create({ property: propertyId });

    res.status(201).json({
      success: true,
      message: "Recommendation created successfully",
      data: recommendation
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// View all recommendations (with selected property fields)
export const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate({
        path: 'Property',
        select: 'title address location image price'
      });

    res.status(200).json({
      success: true,
      data: recommendations
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
