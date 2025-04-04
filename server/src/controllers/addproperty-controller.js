import { validationResult } from "express-validator";
import { BasicProperty } from "../models/testpropertydb.js";

const allowedCategories = ["RESIDENTIAL", "Commercial", "Featured", "Trending"];
const allowedSubCategories = [
  "Luxury Projects",
  "Upcoming Project",
  "High Rise Apartment",
  "Offices",
  "Pre-Leased Offices",
  "Pre-Rented",
  "SCO",
];

export const createPropertyController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let { category, subCategory, title } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    // Advanced normalization: remove all special chars, extra spaces, and convert to lowercase
    const normalizeTitle = (str) => {
      return str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')  // Remove all non-word chars except spaces
        .replace(/\s+/g, ' ')     // Convert multiple spaces to single space
        .trim()                   // Trim whitespace
        .replace(/\s/g, '');      // Finally remove all spaces
    };

    const normalizedTitle = normalizeTitle(title);

    // Check for existing property with similar title
    const existingProperties = await BasicProperty.find({});
    const isDuplicate = existingProperties.some(property => {
      const existingNormalized = normalizeTitle(property.title);
      return existingNormalized === normalizedTitle;
    });

    if (isDuplicate) {
      return res.status(409).json({ 
        success: false, 
        message: "A property with a similar title already exists",
        suggestion: "Please use a more distinct title"
      });
    }

    // Handle subCategory
    if (!subCategory || subCategory === "") {
      subCategory = [];
    }

    if (!Array.isArray(subCategory)) {
      return res.status(400).json({ success: false, message: "Invalid subCategory format" });
    }

    // Validate category
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // Validate subCategory
    if (subCategory.length > 0 && !subCategory.every(sub => allowedSubCategories.includes(sub))) {
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    // Create new property
    const property = await BasicProperty.create({ 
      ...req.body, 
      subCategory,
      originalTitle: title, // Store original title
      normalizedTitle      // Store normalized version for future checks
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      propertyId: property._id,
      data: property,
    });
  } catch (error) {
    console.error("Property creation error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};


export const updatePropertyController = async (req, res) => {
  const errors = validationResult(req);

  const { id } = req.params;
console.log("[DEBUG] Extracted Property ID:", id);

if (!id.match(/^[0-9a-fA-F]{24}$/)) {
  return res.status(400).json({ success: false, message: "Invalid property ID format" });
}

  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { category, subCategory } = req.body;
    console.log("Incoming Update Data:", req.body);
    console.log("Property ID:", req.params.id);

    // ✅ Validate category if provided
    if (category && !allowedCategories.includes(category)) {
      console.log("Invalid Category Provided:", category);
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // ✅ Validate subCategory if provided
    if (
      subCategory &&
      (!Array.isArray(subCategory) || !subCategory.every((sub) => allowedSubCategories.includes(sub)))
    ) {
      console.log("Invalid SubCategory Provided:", subCategory);
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    // ✅ Use BasicProperty instead of old model
    const updatedProperty = await BasicProperty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedProperty) {
      console.log("No Property Found with ID:", req.params.id);
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    console.log("Property Updated Successfully:", updatedProperty);

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Error Updating Property:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getPropertyDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid property ID format" });
    }

    // Fetch property details from all three collections
    const basicDetails = await BasicProperty.findById(id);
    const locationDetails = await PropertyLocation.findOne({ propertyId: id });
    const mediaDetails = await PropertyMedia.findOne({ propertyId: id });

    if (!basicDetails) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        basicDetails,
        locationDetails: locationDetails || {},
        mediaDetails: mediaDetails || {},
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


export const getAllPropertyController = async (req, res) => {
  try {
    const { category, subcategory } = req.body; // Using body instead of query for filters

    let filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subCategory = subcategory;

    // Fetch properties from BasicProperty model
    const properties = await BasicProperty.find(filter);

    if (!properties.length) {
      return res.status(404).json({ success: false, message: "No properties found" });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const searchPropertiesController = async (req, res) => {
  try {
    const { searchTerm } = req.params;

    // Flexible search across multiple fields
    const filter = {
      $or: [
        { category: { $regex: searchTerm, $options: "i" } },
        { subCategory: { $regex: searchTerm, $options: "i" } },
        { city: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: searchTerm, $options: "i" } },
      ],
    };

    // Search only in the BasicProperty model
    const properties = await BasicProperty.find(filter);

    if (!properties.length) {
      return res.status(404).json({ success: false, message: `No properties found for '${searchTerm}'` });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


//import { BasicProperty, PropertyLocation, PropertyMedia } from "../models/testpropertydb.js";

export const deletePropertyController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid property ID" });
    }

    // This will trigger the pre-remove hook
    const deletedProperty = await BasicProperty.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, message: "Property and all related data deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};


