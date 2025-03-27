import { validationResult } from "express-validator";
import addProperty from "../models/addproperty-model.js";

/// add property

export const addPropertyController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const property = await addProperty.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Property added successfully",
        data: property,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update property by ID
export const updatePropertyController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const updatedProperty = await addProperty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    updatedProperty
      ? res.json(updatedProperty)
      : res.status(404).json({ error: "Property not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all properties
export const getAllPropertiesController = async (req, res) => {
  try {
    res.json(await addProperty.find());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get property by ID
export const getPropertyByIdController = async (req, res) => {
  try {
    const property = await addProperty.findById(req.params.id);
    property
      ? res.json(property)
      : res.status(404).json({ error: "Property not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete property by ID
export const deletePropertyController = async (req, res) => {
  try {
    const deletedProperty = await addProperty.findByIdAndDelete(req.params.id);
    deletedProperty
      ? res.json({ message: "Property deleted successfully" })
      : res.status(404).json({ error: "Property not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
