import express from "express";
import { body } from "express-validator";
import {
  createUser,
  updateUser,
  searchUserByName,
  deleteUserById,
} from "../controllers/addUser-controllers.js";

const router = express.Router();

// 🛠 Debugging Middleware
router.use((req, res, next) => {
  console.log(
    `📡 [DEBUG] Incoming ${req.method} Request to ${req.originalUrl}`
  );
  if (Object.keys(req.body).length)
    console.log("📥 [DEBUG] Request Body:", req.body);
  if (Object.keys(req.query).length)
    console.log("🔍 [DEBUG] Query Params:", req.query);
  if (Object.keys(req.params).length)
    console.log("🆔 [DEBUG] Route Params:", req.params);
  next();
});

// Validation Rules
const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
  body("license").isString().withMessage("License should be a string"),
  body("Profile_Image")
    .optional()
    .isURL()
    .withMessage("Invalid upload image URL"),
];

//  Create User Route
router.post("/create", userValidationRules, createUser);

//  Update User Route
router.put("/update/:id", userValidationRules, updateUser);

//  Search User Route
router.get("/search", searchUserByName);

//  Delete User Route
router.delete("/delete/:id", deleteUserById);

//  Export Router
export default router;
