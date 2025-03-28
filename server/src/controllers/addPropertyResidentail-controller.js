import AddPropertyResidentail from "../models/addPropertyResidentail.js";
import { validationResult } from "express-validator";

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const propertyData = req.body;

    const newProperty = new AddPropertyResidentail(propertyData);
    await newProperty.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Property added successfully",
        data: newProperty,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProperty = await AddPropertyResidentail.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Property updated successfully",
        data: updatedProperty,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await AddPropertyResidentail.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE PROPERTY DETAILS
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await AddPropertyResidentail.findById(id).populate(
      "category"
    );

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
