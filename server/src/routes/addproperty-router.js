import express from "express";
import { body, param } from "express-validator";
import {
  createPropertyController,
  // getAllPropertiesController,
  searchPropertiesController,
  updatePropertyController,
  deletePropertyController,
  getPropertyDetailsController,
  getAllPropertyController,
} from "../controllers/addproperty-controller.js";

const router = express.Router();

// Validation rules
const propertyValidationRules = [
  body("category")
    .isIn(["Residential", "Commercial", "Trending", "Featured"])
    .withMessage("Invalid category"),
  body("city").notEmpty().withMessage("City is required"),
  body("status").isIn(["active", "inactive", "pending"]).withMessage("Invalid status"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isString().withMessage("Price must be a string"),
  body("Rental_Yield")
  .isString().withMessage("Rental Yield must be a string")
  .matches(/^\d+%$/).withMessage("Rental Yield must be a number followed by '%' (e.g., '12%')"),
  body("Area").notEmpty().withMessage("Area is required"),
  body("current_Renatal")
  .isString()
    .withMessage("Current rental must be a string"),
  body("Tenure").isString().withMessage("tenure must be a string"),
  body("location").notEmpty().withMessage("Location is required"),
  body("Tenant").notEmpty().withMessage("Tenant is required"),
];

const idValidationRule = [
  param("id").isMongoId().withMessage("Invalid property ID"),
];



// Routes
router.post("/create", propertyValidationRules, createPropertyController);
router.patch(
  "/update/:id",
  idValidationRule,
  propertyValidationRules,
  updatePropertyController
);router.get("/detail/:id", getPropertyDetailsController);

// router.get("/all", getAllPropertiesController); 
router.get("/all", getAllPropertyController); 
router.get("/search/:searchTerm", searchPropertiesController);
router.delete("/delete/:id", idValidationRule, deletePropertyController);

export default router;
