import mongoose from "mongoose";

const addPropertResidentailSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
    require:  true,
    enum: [
      "luxury project",
      "Upcoming project",
      "High Rise Apartment"
    ],
  },
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  propertyImage: {
    type: String,
    default: null
  },
  description: {
    type: String,
    required: true,
  },
});

const addPropertyResidentail = mongoose.model(
  "addPropertyResidentail",
  addPropertResidentailSchema
);

export default addPropertyResidentail;
