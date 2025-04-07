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

//import parser from "../middleware/multer.js";

// For multiple fields (e.g., property_Image, logo_image, etc.)
// router.post('/create', parser.fields([
//   { name: 'property_Image', maxCount: 1 },
//   { name: 'logo_image', maxCount: 1 },
//   { name: 'header_images', maxCount: 10 },
//   { name: 'about_image', maxCount: 10 },
//   { name: 'highlight_image', maxCount: 10 },
//   { name: 'gallery_image', maxCount: 10 },
//   { name: 'floor_plan_images', maxCount: 10 }, // Used below
// ]), createPropertyController);


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
router.post("/location", getPropertiesByLocation);

export default router;
