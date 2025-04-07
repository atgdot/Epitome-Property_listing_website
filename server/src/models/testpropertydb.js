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
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: String, required: true },
  Rental_Yield: { type: String },
  current_Rental: { type: String },
  Area: { type: String },
  Tenure: { type: String },
  Tenant: { type: String },
  property_Image: {
    type: String,
    default: DEFAULT_PROPERTY_IMAGE,
  },
});

// -----------------
// Step 2: Location & Address Details
// -----------------
const propertyLocationSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicProperty",
    required: true,
    index: true,
  },
  city: String,
  location: String,
  address: { type: String, default: "" },
  pincode: { type: String, default: "" },
});

// -----------------
// Step 3: Media & Visuals
// -----------------
const propertyMediaSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicProperty",
    required: true,
  },
  show_logo: { type: Boolean, default: false },
  logo_image: { type: String, default: "" },
  header_images: { type: [String], default: [] },
  about_image: { type: [String], default: [] },
  highlight_image: { type: [String], default: [] },
  gallery_image: { type: [String], default: [] },
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

// Auto-assign logo if `show_logo` is enabled but no image provided
propertyMediaSchema.pre("save", function (next) {
  if (this.show_logo && (!this.logo_image || this.logo_image.trim() === "")) {
    this.logo_image = DEFAULT_PROPERTY_IMAGE;
  }
  next();
});

// -----------------
// Safe Model Creation (Prevents Redefinition in Hot-Reloading)
// -----------------
const BasicProperty = mongoose.models.BasicProperty || mongoose.model("BasicProperty", basicPropertySchema);
const PropertyLocation = mongoose.models.PropertyLocation || mongoose.model("PropertyLocation", propertyLocationSchema);
const PropertyMedia = mongoose.models.PropertyMedia || mongoose.model("PropertyMedia", propertyMediaSchema);

// -----------------
// Attach pre-deleteOne HOOK after dependent models are declared
// -----------------
basicPropertySchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    await PropertyLocation.deleteMany({ property: this._id });
    await PropertyMedia.deleteMany({ property: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

export { BasicProperty, PropertyLocation, PropertyMedia };
