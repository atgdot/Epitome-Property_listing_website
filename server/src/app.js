import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

<<<<<<< Updated upstream
// import propertyRouter from "./routes/addproperty-router.js";
// import ResdentialPropertyRouter from "./routes/addpropertyResidentail-router.js";
// import addUserRouter from "./routes/addUser-route.js";
// import addAgentRouter from "./routes/addAgent-router.js";
// import reviewRouter from "./routes/review-route.js";
// import feedbackRouter from "./routes/feedback-router.js";
// dotenv.config(); // Load environment variables

import propertyRouter from "./routes/addproperty-router.js";
import residentialPropertyRouter from "./routes/addpropertyResidentail-router.js";
import addUserRouter from "./routes/addUser-router.js";
import addAgentRouter from "./routes/addAgent-router.js";
import reviewRouter from "./routes/review-router.js";
import feedbackRouter from "./routes/feedback-router.js";
import recommendationCardRouter from './routes/recommendationCard-router.js'
dotenv.config(); // Load environment variables
connectDB(); // Connect to database
=======
import propertyRouter from "./routes/addproperty-router.js";
import ResdentialPropertyRouter from "./routes/addpropertyResidentail-router.js";
import addUserRouter from "./routes/addUser-route.js";
import addAgentRouter from "./routes/addAgent-router.js";
import reviewRouter from "./routes/review-route.js";
import feedbackRouter from "./routes/feedback-router.js";
dotenv.config(); // Load environment variables

import propertyRouter from "./routes/addproperty-router.js";
import residentialPropertyRouter from "./routes/addpropertyResidentail-router.js";
import addUserRouter from "./routes/addUser-router.js";
import addAgentRouter from "./routes/addAgent-router.js";
import reviewRouter from "./routes/review-router.js";
import feedbackRouter from "./routes/feedback-router.js";

dotenv.config(); // Load environment variables

// ✅ Debug log: Starting server
console.log("🚀 Starting server...");

connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

connectDB(); // Connect to database

>>>>>>> Stashed changes
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

// ✅ Debug Middleware to log every request
app.use((req, res, next) => {
  console.log(
    `📡 [DEBUG] Incoming ${req.method} Request to ${req.originalUrl}`
  );
  if (Object.keys(req.body).length)
    console.log("📥 [DEBUG] Request Body:", req.body);
  if (Object.keys(req.query).length)
    console.log("🔍 [DEBUG] Query Params:", req.query);
  if (Object.keys(req.params).length)
    console.log("🆔 [DEBUG] Route Params:", req.params);
  next();
});

<<<<<<< Updated upstream
// Routes

//rouets
app.use('/api/v1/admin-dashboard/property' , propertyRouter)
app.use('/api/v1/admin-dashboard/property' , residentialPropertyRouter)
app.use('/api/v1/admin-dashboard/user' , addUserRouter)
app.use('/api/v1/admin-dashboard/user' , addAgentRouter)
app.use('/api/v1/admin-dashboard/review' , reviewRouter)
app.use('/api/v1/admin-dashboard/recommendation' , recommendationCardRouter)
app.use('/api/v1/feedback' , feedbackRouter)



// //  Fix: Use different paths for each router
// app.use('/api/v1/admin-dashboard/property', propertyRouter);
// app.use('/api/v1/admin-dashboard/residential-property', residentialPropertyRouter);
// app.use('/api/v1/admin-dashboard/user', addUserRouter);
// app.use('/api/v1/admin-dashboard/agent', addAgentRouter);
// app.use('/api/v1/admin-dashboard/review', reviewRouter);
// app.use('/api/v1/feedback', feedbackRouter); // ✅ Fixed feedback router
=======
// Test route
app.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Hello World" });
});

//rouets
app.use("/api/v1/admin-dashboard/property", propertyRouter);
app.use("/api/v1/admin-dashboard/property", ResdentialPropertyRouter);
app.use("/api/v1/admin-dashboard/user", addUserRouter);
app.use("/api/v1/admin-dashboard/user", addAgentRouter);
app.use("/api/v1/admin-dashboard/review", reviewRouter);
app.use("/api/v1/feedback", feedbackRouter);

// ✅ Fix: Use different paths for each router
app.use("/api/v1/admin-dashboard/property", propertyRouter);
app.use(
  "/api/v1/admin-dashboard/residential-property",
  residentialPropertyRouter
);
app.use("/api/v1/admin-dashboard/user", addUserRouter);
app.use("/api/v1/admin-dashboard/agent", addAgentRouter);
app.use("/api/v1/admin-dashboard/review", reviewRouter);
app.use("/api/v1/feedback", feedbackRouter); // ✅ Fixed feedback router
>>>>>>> Stashed changes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
<<<<<<< Updated upstream
  console.log(` Server running on port ${PORT}`);
=======
  console.log(`✅ Server running on port ${PORT}`);
>>>>>>> Stashed changes
});
