import express from "express";
// import bodyParser from "body-parser"; // bodyParser is built into express >= 4.16, express.json() is used
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// import multer from "multer"; // Only import multer here if needed globally, usually imported in specific middleware/routes
import path from "path"; // Keep if needed elsewhere
import connectDB from "./db/connectDB.js";
import fs from "fs"; // Keep if needed elsewhere, e.g., checking static paths
import cookieParser from "cookie-parser";

// Import routers
import propertyRouter from "./routes/addproperty-router.js";
import addUserRouter from "./routes/addUser-router.js";
import addAgentRouter from "./routes/addAgent-router.js";
import reviewRouter from "./routes/review-router.js";
import feedbackRouter from "./routes/feedback-router.js";
import recommendationCardRouter from "./routes/recommendationCard-router.js";
import EnquiryForm from "./routes/enquiry-router.js"
import adminLoginRouter from "./routes/adminLogin-router.js";

// Load environment variables and connect to the database
dotenv.config();
connectDB();

const app = express();
 
// Middleware
app.use(express.json()); // Handles JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny")); // Logging
app.use(
  cors({
    origin: "*", // Consider restricting this in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser())
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // Keep if needed, review Helmet docs for implications
  })
);

// Debug middleware to log every request
app.use((req, res, next) => {
  console.log(`📡 [DEBUG] Incoming ${req.method} Request to ${req.originalUrl}`);
  if (Object.keys(req.body).length) console.log("📥 [DEBUG] Request Body:", req.body);
  if (Object.keys(req.query).length) console.log("🔍 [DEBUG] Query Params:", req.query);
  if (Object.keys(req.params).length) console.log("🆔 [DEBUG] Route Params:", req.params);
  next();
});

// --- Removed Local Multer Configuration ---
// const storage = multer.diskStorage({...});
// const fileFilter = (req, file, cb) => {...};
// const upload = multer({...});
// export const uploadMiddleware = {...};
// --- End of Removed Section ---

// Routes - Apply specific middleware (like your Cloudinary 'parser') within these routers
// Each router is mounted on a unique endpoint
app.use("/api/v1/admin", adminLoginRouter);
app.use("/api/v1/admin-dashboard/property", propertyRouter);
app.use("/api/v1/admin-dashboard/user", addUserRouter);
app.use("/api/v1/admin-dashboard/agent", addAgentRouter);
app.use("/api/v1/admin-dashboard/review", reviewRouter);
app.use("/api/v1/admin-dashboard/recommendation", recommendationCardRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/enquiry_form", EnquiryForm)

// Serve uploaded files statically (Only keep if you still have a reason to serve local files)
// If ALL uploads go to Cloudinary, you might not need this.
// Consider if 'uploads' directory is still relevant.
// app.use('/uploads', express.static('uploads'));

// Error handling middleware for multer (KEEP THIS - Cloudinary uploads can still have MulterErrors)
// Make sure 'multer' is imported if you keep this, or handle errors differently.
// You might need to import multer specifically for 'instanceof multer.MulterError' check.
import multer from 'multer'; // <--- Added import for the error handler below

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.error("❌ Multer Error Caught:", error); // Log multer errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size is too large. Check limits.' // Generic message as limit might vary
      });
    }
    // Handle other potential multer errors (LIMIT_FIELD_COUNT, etc.)
    return res.status(400).json({
      success: false,
      message: `File upload error: ${error.message}` // Provide multer's message
    });
  }
  // Handle errors possibly thrown by Cloudinary storage or other middleware/routes
  console.error("❌ General Error Caught:", error); // Log non-multer errors
  // Pass to default Express error handler or a more specific one
  next(error);
});

// Add a generic error handler (Optional but recommended)
app.use((error, req, res, next) => {
    // Ensure response headers haven't already been sent
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
        // Optionally include stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});


// Test route
app.get("/test", (req, res) => {
  console.log(" Test route hit!");
  res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});