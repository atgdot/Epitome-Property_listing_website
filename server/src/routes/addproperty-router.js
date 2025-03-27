import express from "express";
import { body, param } from "express-validator";
import {
  addPropertyController,
  getAllPropertiesController,
  getPropertyByIdController,
  updatePropertyController,
  deletePropertyController,
} from '../controllers/addproperty-controller.js';

const router = express.Router();

// Validation rules
const propertyValidationRules = [
  body("category")
    .isIn(["Residential", "Commercial", "Trending", "Featured"])
    .withMessage("Invalid category"),
  body("city").notEmpty().withMessage("City is required"),
  body("status")
    .isIn(["Active", "Inactive"])
    .withMessage("Invalid status"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("Rental_Yield").isNumeric().withMessage("Rental Yield must be a number"),
  body("Area").notEmpty().withMessage("Area is required"),
  body("current_Renatal").isNumeric().withMessage("Current rental must be a number"),
  body("tenure").isNumeric().withMessage("Tenure must be a number"),
  body("location").notEmpty().withMessage("Location is required"),
  body("Tenant").notEmpty().withMessage("Tenant is required"),
];

const idValidationRule = [
  param("id").isMongoId().withMessage("Invalid property ID"),
];

// Routes
router.post("/add", propertyValidationRules, addPropertyController);
router.put("/update/:id", idValidationRule, propertyValidationRules, updatePropertyController);
router.get("/all", getAllPropertiesController);
router.get("/:id", idValidationRule, getPropertyByIdController);
router.delete("/:id", idValidationRule, deletePropertyController);

export default router;