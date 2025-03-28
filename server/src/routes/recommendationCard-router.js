import express from 'express';
import { createRecommendationCard , deleteRecommendationCard} from '../controllers/recommendationCard-controller.js';


import { body, param } from "express-validator";
const router = express.Router();


// validation 
const validateRecommendation = [
  body("property_Title").notEmpty().withMessage("Property title is required"),
  body("Address").notEmpty().withMessage("Address is required"),
  body("Image_url").optional().isURL().withMessage("Invalid image URL"),
  body("upload_image").optional().isURL().withMessage("Invalid upload image URL"),
  ];

  const validateRecommendationId = [
    param("id").isMongoId().withMessage("Invalid recommendation ID"),
  ];
  


   // routes
  router.post("/addCard", validateRecommendation, createRecommendationCard);
  
  router.delete("deleteCard/:id", validateRecommendationId, deleteRecommendationCard);
  
  export default router;