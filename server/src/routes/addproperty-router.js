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
  getPropertiesByLocation,
} from "../controllers/addproperty-controller.js";

const router = express.Router();

// Validation rules
// const propertyValidationRules = [
//   body("category")
//     .custom((value) => {
//       const validCategories = ["Residential", "Commercial", "Trending", "Featured"];
//       if (!validCategories.includes(value.toLowerCase())) {
//         throw new Error(
//           "Invalid category. Allowed values: Residential, Commercial, Trending, Featured"
//         );
//       }
//       return true;
//     }),
//   body("subcategory")
//     .optional()
//     .custom((value) => {
//       const validSubcategories = [
//         "Luxury Project",
//         "Upcoming project",
//         "High Rise Apartment",
//         "Offices",
//         "Pre Leased Offices",
//         "Pre-Rented",
//         "SCO",
//       ];
//       if (!validSubcategories.includes(value.toLowerCase())) {
//         throw new Error(
//           "Invalid subcategory. Allowed values: luxury project, upcoming project, etc."
//         );
//       }
//       return true;
//     }),
//   //body("city").notEmpty().withMessage("City is required"),
//   // body("status")
//   //   .isIn(["active", "inactive", "pending"])
//   //   .withMessage("Invalid status"),
//   body("title").notEmpty().withMessage("Title is required"),
//   body("description").notEmpty().withMessage("Description is required"),
//   body("price").isString().withMessage("Price must be a string"),
//   body("Rental_Yield").optional().isString(),
//   body("current_Renatal").optional().isString(),
//   body("Area").optional().isString(),
//   body("Tenure").optional().isString(),
//   body("Tenant").optional().isString(),
//   body("location").optional().isString(),
//   body("property_Image").optional().isString(),
// ];
// const idValidationRule = [
//   param("id").isMongoId().withMessage("Invalid property ID"),
// ];



// Routes
router.post("/create", createPropertyController);
router.patch(
  "/:id",

  
  updatePropertyController
);
router.get("/detail/:id", getPropertyDetailsController);

// router.get("/all", getAllPropertiesController); 
router.get("/all", getAllPropertyController); 
router.get("/search/:searchTerm", searchPropertiesController);
router.delete("/delete/:id", deletePropertyController);
router.get("/location", getPropertiesByLocation);

export default router;
