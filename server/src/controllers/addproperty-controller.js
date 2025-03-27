import { validationResult } from "express-validator";
import addProperty from "../models/addproperty-model.js";

// add property
export const addPropertyController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const property = await addProperty.create(req.body);
    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Update Property by ID
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
      ? res.json({ success: true, data: updatedProperty })
      : res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Properties with Filtering & Pagination
export const getAllPropertiesController = async (req, res) => {
  try {
    let filter = {};

    //  Apply filters based on query parameters
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.city) {
      filter.city = req.query.city;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    }
    if (req.query.tenure) {
      filter.tenure = req.query.tenure;
    }

    //  Pagination Parameters
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    const properties = await addProperty.find(filter).skip(skip).limit(limit);
    const totalProperties = await addProperty.countDocuments(filter);

    res.json({
      success: true,
      totalRecords: totalProperties,
      totalPages: Math.ceil(totalProperties / limit),
      currentPage: page,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get Property by ID
export const getPropertyByIdController = async (req, res) => {
  try {
    const property = await addProperty.findById(req.params.id);
    property
      ? res.json({ success: true, data: property })
      : res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Property by ID
export const deletePropertyController = async (req, res) => {
  try {
    const deletedProperty = await addProperty.findByIdAndDelete(req.params.id);
    deletedProperty
      ? res.json({
          success: true,
          message: "Property deleted successfully",
        })
      : res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
