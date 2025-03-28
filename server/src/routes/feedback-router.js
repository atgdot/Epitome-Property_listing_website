import express from "express";
import { submitFeedback } from "../controllers/feedback-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/submit",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("phone").notEmpty().withMessage("Phone number is required"),
    check("message").notEmpty().withMessage("Message is required"),
  ],
  submitFeedback
);

export default router;