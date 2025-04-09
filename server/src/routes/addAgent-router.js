import express from "express";
import { body } from "express-validator";
import {
  createAgent,
  updateAgent,
  searchAgentByName,
  deleteAgentById,
  getAllAgents
} from "../controllers/addAgent-controller.js";
import parser from "../middleware/multer.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`📡 [DEBUG] Incoming ${req.method} Request to ${req.originalUrl}`);
  if (Object.keys(req.body).length) console.log("📥 [DEBUG] Request Body:", req.body);
  if (Object.keys(req.query).length) console.log("🔍 [DEBUG] Query Params:", req.query);
  if (Object.keys(req.params).length) console.log("🆔 [DEBUG] Route Params:", req.params);
  if (req.files) console.log("📂 [DEBUG] Uploaded Files:", req.files);
  next();
});

const agentValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
];

router.get("/all", getAllAgents);

router.post(
  "/create",
  parser.fields([
    { name: "license", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  agentValidationRules,
  createAgent
);

router.patch(
  "/update/:id",
  parser.fields([
    { name: "license", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  agentValidationRules,
  updateAgent
);

router.get("/search/:searchTerm", searchAgentByName);

router.delete("/delete/:id", deleteAgentById);

export default router;