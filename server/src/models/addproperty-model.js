import mongoose from "mongoose";

const addPropertySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["RESIDENTIAL", "Commercial", "Featured", "Trending"],
    required: true,
  },
  subCategory: {
    type: [String],
    enum: [
      "Luxury Projects",
      "Upcoming Project",
      "High Rise Apartment",
      "Offices",
      "Pre-Leased Offices",
      "Pre-Rented",
      "SCO",
    ],
    default: [], // Allows subCategory to be empty
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  Rental_Yield: {
    type: String,
  },
  current_Renatal: {
    type: String,
  },
  Area: {
    type: String,
  },
  Tenure: {
    type: String,
  },
  Tenant: {
    type: String,
  },
  location: {
    type: String,
  },
  property_Image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSTWFa-5clKaN3zrnAriHY10BICdAFuXvTg&s",
  },
});

const addProperty = mongoose.model("addProperty", addPropertySchema);

export default addProperty;
