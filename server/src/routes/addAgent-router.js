import express from "express";
import multer from "multer";
import { body } from "express-validator";
import {
  createAgent,
  updateAgent,
  searchAgentByName,
  deleteAgentById,
  getAllAgents
} from "../controllers/addAgent-controller.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`📡 [DEBUG] Incoming ${req.method} Request to ${req.originalUrl}`);
  if (Object.keys(req.body).length) console.log("📥 [DEBUG] Request Body:", req.body);
  if (Object.keys(req.query).length) console.log("🔍 [DEBUG] Query Params:", req.query);
  if (Object.keys(req.params).length) console.log("🆔 [DEBUG] Route Params:", req.params);
  if (req.files) console.log("📂 [DEBUG] Uploaded Files:", req.files);
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const agentValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("propertyNumber").notEmpty().withMessage("Property Number is required"),
];

router.get("/all", getAllAgents);

router.post(
  "/create",
  upload.fields([{ name: "license", maxCount: 1 }, { name: "profileImage", maxCount: 1 }]),
  agentValidationRules,
  createAgent
);

router.put(
  "/update/:id",
  upload.fields([{ name: "license", maxCount: 1 }, { name: "profileImage", maxCount: 1 }]),
  agentValidationRules,
  updateAgent
);

router.get("/search", searchAgentByName);

router.delete("/delete/:id", deleteAgentById);

export default router;
