import { validationResult } from "express-validator";
import addProperty from "../models/addproperty-model.js";

// add property
export const createPropertyController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const property = await addProperty.create(req.body);
    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Update Property by ID
export const updatePropertyController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const updatedProperty = await addProperty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    updatedProperty
      ? res.json({
          success: true,
          data: updatedProperty,
        })
      : res.status(404).json({
          success: false,
          message: "Property not found",
        });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 // view detail 

 export const getPropertyDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid property ID format" });
    }

    const property = await addProperty.findById(id);

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error(" Error fetching property details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


 // Get All Properties
export const getAllPropertyController = async (req, res) => {
  try {
    const properties = await addProperty.find();
    
    if (!properties || properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found" });
    }

    res.status(200).json({ success: true, data: properties });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get All Properties with Filtering & Pagination
// export const getAllPropertiesController = async (req, res) => {
//   try {
//     let filter = {};

//     //  Apply filters based on query parameters
//     if (req.query.category) {
//       filter.category = req.query.category;
//     }
//     if (req.query.city) {
//       filter.city = req.query.city;
//     }
//     if (req.query.status) {
//       filter.status = req.query.status;
//     }
//     if (req.query.minPrice && req.query.maxPrice) {
//       filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
//     }
//     if (req.query.tenure) {
//       filter.tenure = req.query.tenure;
//     }

//     //  Pagination Parameters
//     let page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 10;
//     let skip = (page - 1) * limit;

//     const properties = await addProperty.find(filter).skip(skip).limit(limit);
//     const totalProperties = await addProperty.countDocuments(filter);

//     res.json({
//       success: true,
//       totalRecords: totalProperties,
//       totalPages: Math.ceil(totalProperties / limit),
//       currentPage: page,
//       data: properties,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//  Get Property by name
export const searchPropertiesController = async (req, res) => {
  try {
    const { searchTerm } = req.params; // Get the search term from URL params

    // Create a flexible search filter
    const filter = {
      $or: [
        { category: { $regex: searchTerm, $options: "i" } }, // Match category (case-insensitive)
        { subCategory: { $regex: searchTerm, $options: "i" } }, // Match subCategory
        { city: { $regex: searchTerm, $options: "i" } }, // Match city
        { title: { $regex: searchTerm, $options: "i" } }, // Match property title
        { status: { $regex: searchTerm, $options: "i" } } // Match property status
      ]
    };

    // console.log(" Search Filter:", filter);

    // Find properties matching the filter
    const properties = await addProperty.find(filter);

    if (!properties.length) {
      return res.status(404).json({ success: false, message: `No properties found for '${searchTerm}'` });
    }

    res.status(200).json({ 
      success: true, 
      // data: properties 
    });
  } catch (error) {
    // console.error(" Error searching properties:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


// Delete Property by ID
export const deletePropertyController = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid property ID" });
    }

    const deletedProperty = await addProperty.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};