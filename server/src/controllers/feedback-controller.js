import Feedback from "../models/feedback-model.js";
import { validationResult } from "express-validator";

// SUBMIT FEEDBACK
export const submitFeedback = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, message } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      phone,
      message,
    });

    await newFeedback.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Feedback submitted successfully",
        data: newFeedback,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
