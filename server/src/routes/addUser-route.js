import express from "express";
import { body } from "express-validator";

import { createUser, updateUser ,searchUserByName} from "../controllers/addUser-controllers.js";
const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
  body("license").notEmpty().withMessage("License is required"),
];


const router = express.Router();

router.post("/create", userValidationRules, createUser);
router.put("/update/:id", userValidationRules,  updateUser);
router.get("/search", searchUserByName);

export default router;