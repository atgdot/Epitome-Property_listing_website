import express from "express";
import { body } from "express-validator";
import {
  createUser,
  updateUser,
  searchUserByName,
  deleteUserById,
  getAllUsers,
} from "../controllers/addUser-controllers.js";
import parser from "../middleware/multer.js"; // ✅ Cloudinary-based multer parser

const router = express.Router();

// 🛠 Debugging Middleware
router.use((req, res, next) => {
  console.log(`📡 [DEBUG] Incoming ${req.method} Request to ${req.originalUrl}`);
  if (Object.keys(req.body).length) console.log("📥 [DEBUG] Request Body:", req.body);
  if (Object.keys(req.query).length) console.log("🔍 [DEBUG] Query Params:", req.query);
  if (Object.keys(req.params).length) console.log("🆔 [DEBUG] Route Params:", req.params);
  if (req.files) console.log("📂 [DEBUG] Uploaded Files:", req.files);
  next();
});

// ✅ Validation Rules
const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
];

// ✅ GET all users
router.get("/all", getAllUsers);

// ✅ Create User Route (Cloudinary upload)
router.post(
  "/create",
  parser.fields([
    { name: "license", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  userValidationRules,
  createUser
);

// ✅ Update User Route (Cloudinary upload)
router.put(
  "/update/:id",
  parser.fields([
    { name: "license", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  userValidationRules,
  updateUser
);

// ✅ Search User Route
router.get("/search", searchUserByName);

// ✅ Delete User Route
router.delete("/delete/:id", deleteUserById);

export default router;