import express from 'express';
import {
  createRecommendationCard,
  deleteRecommendationCard,
  getAllRecommendations,
} from '../controllers/recommendationCard-controller.js';
import auth from '../middleware/authMiddlware.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Validation
const validateRecommendation = [
  body("propertyId").isMongoId().withMessage("Valid property ID is required"),
];

const validateRecommendationId = [
  param("id").isMongoId().withMessage("Invalid recommendation ID"),
];

// Routes
router.post("/add", auth, validateRecommendation, createRecommendationCard);

router.get("/all", auth, getAllRecommendations);

router.delete("/delete/:id", auth, validateRecommendationId, deleteRecommendationCard);

export default router;
