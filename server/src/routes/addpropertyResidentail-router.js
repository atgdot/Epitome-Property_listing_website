import express from "express";
import {
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyById,
  searchProperty
} from "../controllers/addPropertyResidentail-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/residentailCreate",
  [
    check("category").notEmpty().withMessage("Category is required"),
    check("title").notEmpty().withMessage("Title is required"),
    check("city").notEmpty().withMessage("City is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("price").notEmpty().withMessage("Price is required"),
    check("description").notEmpty().withMessage("Description is required"),
  ],
  createProperty
);

router.put("/update/:id", updateProperty); // Update property
router.delete("/delete/:id", deleteProperty); // Delete property
router.get("detail/:id", getPropertyById); // Get property by ID
router.get("/search/:searchTerm", searchProperty);


export default router;
