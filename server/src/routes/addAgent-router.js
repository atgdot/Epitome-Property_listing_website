import express from "express";
import { body } from "express-validator";
import { createAgent, updateAgent, searchAgentByName, deleteAgentById , getAgentById, getAllAgents } from "../controllers/addAgent-controller.js";

const router = express.Router();

const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
  body("license").isString().withMessage("License should be a string"),
  body("Profile_Image").optional().isURL().withMessage("Invalid upload image URL"),
];

console.log("[DEBUG] Initializing Agent Routes...");

router.post("/create", userValidationRules, (req, res, next) => {
  console.log("[DEBUG] Route matched: POST /create");
  console.log("[DEBUG] Request Body:", req.body);
  next();
}, createAgent);

router.put("/update/:id", userValidationRules, (req, res, next) => {
  console.log("[DEBUG] Incoming PUT Request to /update");
  console.log("[DEBUG] Params ID:", req.params.id);
  console.log("[DEBUG] Request Body:", req.body);
  next();
}, updateAgent);

router.get("/search", (req, res, next) => {
  console.log("[DEBUG] Incoming GET Request to /search");
  console.log("[DEBUG] Query Params:", req.query);
  next();
}, searchAgentByName);

router.delete("/delete/:id", (req, res, next) => {
  console.log("[DEBUG] Incoming DELETE Request to /delete");
  console.log("[DEBUG] Params ID:", req.params.id);
  next();
}, deleteAgentById);

router.get("/all", getAllAgents);

export default router;
