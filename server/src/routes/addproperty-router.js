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
 body("subcategory")
    .isIn(["luxury project",
      "Upcoming project",
      "High Rise Apartment",
      "offices",
      "Pre-leased",
      "Pre-rented",
      "SCO",])
    .withMessage("Invalid category"),
  body("city").notEmpty().withMessage("City is required"),
  body("status").isIn(["active", "inactive", "pending"]).withMessage("Invalid status"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isString().withMessage("Price must be a string"),
  body("status")
  .isIn(["active", "inactive", "pending"])
  .withMessage("Invalid status. Allowed values: active, inactive, pending"),
  body("Rental_Yield").optional().isString(),
  body("current_Renatal").optional().isString(),
  body("Area").optional().isString(),
  body("Tenure").optional().isString(),
  body("Tenant").optional().isString(),
  body("location").optional().isString(),
  body("property_Image").optional().isString(),
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
