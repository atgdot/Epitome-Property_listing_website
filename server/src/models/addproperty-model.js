import mongoose from "mongoose";

const addPropertySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Residential", "Commercial", "Trending", "Featured"],
    required: true,
  },
  subCategory: {
    type: [String],
    require:  true,
    enum: [
      "offices",
      "Pre-leased",
      "Pre-rented",
      "SCO",
    ],
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
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
    required: true,
  },
  current_Renatal: {
    type: String,
    required: true,
  },  
  Area: {
    type: String,
    required: true,
  },
  Tenure: {
    type: String,
    required: true,
  },
  Tenant: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: null
  },
  property_Image: {
    type: String,
    default:null
  },
});

const addProperty = mongoose.model("addProperty", addPropertySchema);

export default addProperty;
