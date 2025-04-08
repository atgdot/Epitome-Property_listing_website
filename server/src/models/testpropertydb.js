import mongoose from "mongoose";

const DEFAULT_PROPERTY_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSTWFa-5clKaN3zrnAriHY10BICdAFuXvTg&s";

// -----------------
// Step 1: Basic Property Information
// -----------------
const allowedCategories = ["Residential", "Commercial", "Featured", "Trending"];
const allowedSubCategories = [
  "Luxury Project",
  "Upcoming Project",
  "High Rise Apartment",
  "Offices",
  "Pre Leased Offices",
  "Pre-Rented",
  "SCO",
];

const basicPropertySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: allowedCategories,
    required: true,
  },
  subCategory: {
    type: [String], 
    enum: allowedSubCategories,
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
  },
  Rental_Yield: {
    type: String,
  },
  current_Rental: {
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
  property_Image: {
    type: String,
    default: DEFAULT_PROPERTY_IMAGE,
  },

});

// Add pre-remove hook here
basicPropertySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  try {
    await PropertyLocation.deleteMany({ property: this._id });
    await PropertyMedia.deleteMany({ property: this._id });
    next();
  } catch (err) {
    next(err);
  }
});


const BasicProperty = mongoose.model("BasicProperty", basicPropertySchema);

// -----------------
// Step 2: Location & Address Details
// -----------------
const propertyLocationSchema = new mongoose.Schema({
  // In propertyLocationSchema and propertyMediaSchema
  property: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicProperty",
    required: true,
    index: true // Add this for better query performance
  },
  city: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false, 
  },
  address: {
    type: String,
    default: "",
  },
  pincode: {
    type: String,
    default: "",
  },
  // The property image that uses the same default as the original property_Image
});

const PropertyLocation = mongoose.model("PropertyLocation", propertyLocationSchema);

// -----------------
// Step 3: Media & Visuals
// -----------------

// Define a constant for the default property image URL


const propertyMediaSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicProperty",
    required: true,
  },
  // This boolean represents the radio button option to show the logo
  show_logo: {
    type: Boolean,
    default: false,
  },
  logo_image: {
    type: String,
    default: "",
  },
  
  header_images: {
  type: [String],
  default: [],
  },
  about_image: {
    type: [String],
    default: [],
  },
  highlight_image: {
    type: [String],
    default: [],
  },
  gallery_image: {
    type: [String],
    default: [],
  },
  floor_plans: {
    type: [
      {
        description: { type: String, default: "" },
        area: { type: Number, default: 0 },
        image: { type: String, default: "" },
      },
    ],
    default: [],
  },
});

// Pre-save hook: if show_logo is enabled but no logo_image is provided,
// assign the default property image URL to logo_image.
propertyMediaSchema.pre("save", function (next) {
  if (this.show_logo && (!this.logo_image || this.logo_image.trim() === "")) {
    this.logo_image = DEFAULT_PROPERTY_IMAGE;
  }
  next();
});

const PropertyMedia = mongoose.model("PropertyMedia", propertyMediaSchema);

export { BasicProperty, PropertyLocation, PropertyMedia };