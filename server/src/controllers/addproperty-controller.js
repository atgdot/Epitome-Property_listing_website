import { validationResult } from "express-validator";
import addProperty from "../models/addproperty-model.js";

// Allowed categories and subcategories
const allowedCategories = ["residential", "commercial", "featured", "trending"];
const allowedSubCategories = ["luxury projects", "upcoming project", "high rise apartment"];

// Add Property
export const createPropertyController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { category, subCategory } = req.body;

    // Validate category
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // Validate subCategory (ensure all values are allowed)
    if (!Array.isArray(subCategory) || !subCategory.every(sub => allowedSubCategories.includes(sub))) {
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    const property = await addProperty.create(req.body);
    res.status(201).json({ success: true, message: "Property added successfully", data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Property by ID
export const updatePropertyController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { category, subCategory } = req.body;

    // Validate category if provided
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // Validate subCategory if provided
    if (subCategory && (!Array.isArray(subCategory) || !subCategory.every(sub => allowedSubCategories.includes(sub)))) {
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    const updatedProperty = await addProperty.findByIdAndUpdate(req.params.id, req.body, { new: true });

    updatedProperty
      ? res.json({ success: true, data: updatedProperty })
      : res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// View Property Details
export const getPropertyDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid property ID format" });
    }

    const property = await addProperty.findById(id);

    property
      ? res.status(200).json({ success: true, data: property })
      : res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Get All Properties with "why work with us"
export const getAllPropertyController = async (req, res) => {
  try {
    const { category, subcategory } = req.body; // Assuming frontend sends data in request body

    let filter = {};

    // Apply only category & subcategory filters
    if (category) filter.category = category;
    if (subcategory) filter.subCategory = subcategory;

    const properties = await addProperty.find(filter);

    if (!properties.length) {
      return res.status(404).json({ success: false, message: "No properties found" });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Search Properties
export const searchPropertiesController = async (req, res) => {
  try {
    const { searchTerm } = req.params;

    // Create a flexible search filter
    const filter = {
      $or: [
        { category: { $regex: searchTerm, $options: "i" } },
        { subCategory: { $regex: searchTerm, $options: "i" } },
        { city: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: searchTerm, $options: "i" } }
      ]
    };

    const properties = await addProperty.find(filter);

    if (!properties.length) {
      return res.status(404).json({ success: false, message: `No properties found for '${searchTerm}'` });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Delete Property by ID
export const deletePropertyController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid property ID" });
    }

    const deletedProperty = await addProperty.findByIdAndDelete(id);

    deletedProperty
      ? res.status(200).json({ success: true, message: "Property deleted successfully" })
      : res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

