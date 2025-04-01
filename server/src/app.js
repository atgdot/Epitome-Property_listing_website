import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

// Import routers once
import propertyRouter from "./routes/addproperty-router.js";
import residentialPropertyRouter from "./routes/addpropertyResidentail-router.js";
import addUserRouter from "./routes/addUser-router.js";
import addAgentRouter from "./routes/addAgent-router.js";
import reviewRouter from "./routes/review-router.js";
import feedbackRouter from "./routes/feedback-router.js";
import recommendationCardRouter from "./routes/recommendationCard-router.js";

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

// Routes
// Each router is mounted on a unique endpoint
app.use("/api/v1/admin-dashboard/property", propertyRouter);
app.use("/api/v1/admin-dashboard/residential-property", residentialPropertyRouter);
app.use("/api/v1/admin-dashboard/user", addUserRouter);
app.use("/api/v1/admin-dashboard/agent", addAgentRouter);
app.use("/api/v1/admin-dashboard/review", reviewRouter);
app.use("/api/v1/admin-dashboard/recommendation", recommendationCardRouter);
app.use("/api/v1/feedback", feedbackRouter);

// Test route
app.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
