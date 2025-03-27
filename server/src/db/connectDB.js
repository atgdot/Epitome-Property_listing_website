import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};
export default connectDB;