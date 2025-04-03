import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import connectDB from "./db/connectDB.js";
import fs from "fs";

// Import routers once
import propertyRouter from "./routes/addproperty-router.js";
import residentialPropertyRouter from "./routes/addpropertyResidentail-router.js";
import addUserRouter from "./routes/addUser-router.js";
import addAgentRouter from "./routes/addAgent-router.js";
import reviewRouter from "./routes/review-router.js";
import feedbackRouter from "./routes/feedback-router.js";
import recommendationCardRouter from "./routes/recommendationCard-router.js";
import EnquiryForm from "./routes/enquiry-router.js"

// Load environment variables and connect to the database once
dotenv.config();
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

console.log("🚀 Starting server...");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
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

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create different destinations based on file type
    let uploadPath = 'uploads/';
    if (file.fieldname === 'license') {
      uploadPath += 'licenses/';
    } else if (file.fieldname === 'profileImage') {
      uploadPath += 'profiles/';
    }
    // Create directories if they don't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'license') {
    // Allow only PDFs for license
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('License must be a PDF file'), false);
    }
  } else if (file.fieldname === 'profileImage') {
    // Allow common image formats for profile images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Profile image must be an image file'), false);
    }
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  }
});

// Export multer middleware for use in routes
export const uploadMiddleware = {
  single: (fieldName) => upload.single(fieldName),
  fields: () => upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
  ])
};

// Routes
// Each router is mounted on a unique endpoint
app.use("/api/v1/admin-dashboard/property", propertyRouter);
app.use("/api/v1/admin-dashboard/residential-property", residentialPropertyRouter);
app.use("/api/v1/admin-dashboard/user", addUserRouter);
app.use("/api/v1/admin-dashboard/agent", addAgentRouter);
app.use("/api/v1/admin-dashboard/review", reviewRouter);
app.use("/api/v1/admin-dashboard/recommendation", recommendationCardRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/enquiry_form", EnquiryForm)

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size is too large. Max limit is 5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next(error);
});

// Test route
app.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
