import express from "express";
import { body } from "express-validator";

import { createAgent, updateAgent ,searchAgentByName, deleteAgentById} from "../controllers/addAgent-controller.js"
 const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
  body("license").notEmpty().withMessage("License is required"),
];


const router = express.Router();

router.post("/create", userValidationRules,  createAgent);
router.put("/update/:id", userValidationRules, updateAgent);
router.get("/search", searchAgentByName);
router.delete("/delete/:id", deleteAgentById);


export default router;