import mongoose from "mongoose";

const addPropertySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Residential", "Commercial", "Trending", "Featured"],
    required: true,
  },
  subCategory: [{
    type: String,
    require:  true,
    eum: [
      "luxury project",
      " upcoming project",
      " high Rise Apartment",
      "offices",
      "Pre-leased",
      "Pre-rented",
      "SCO",
    ],
  }],
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
    default: "inactive",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Rental_Yield: {
    type: Number,
    required: true,
  },
  Area: {
    type: String,
    required: true,
  },
  current_Renatal: {
    type: Number,
    required: true,
  },
  tenure: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  Tenant: {
    type: String,
    required: true,
  },
  property_Image: {
    type: String,
    default:null
  },
});

const addProperty = mongoose.model("addProperty", addPropertySchema);

export default addProperty;
