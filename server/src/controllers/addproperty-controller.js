import { validationResult } from "express-validator";
import { BasicProperty, PropertyLocation, PropertyMedia } from "../models/testpropertydb.js";
import mongoose from "mongoose";

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
    let { category, subCategory, title, locationDetails, mediaDetails } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const normalizeTitle = (str) => {
      return str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\s/g, '');
    };

    const normalizedTitle = normalizeTitle(title);

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

    if (!subCategory || subCategory === "") {
      subCategory = [];
    }

    if (!Array.isArray(subCategory)) {
      return res.status(400).json({ success: false, message: "Invalid subCategory format" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    if (subCategory.length > 0 && !subCategory.every(sub => allowedSubCategories.includes(sub))) {
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    // 1️⃣ Create Basic Property
    const property = await BasicProperty.create({ 
      ...req.body, 
      subCategory,
      originalTitle: title,
      normalizedTitle
    });

    console.log("✅ Basic property created:", property);

    // 2️⃣ Create Location Details (if provided)
    let createdLocation = null;
    if (locationDetails) {
      createdLocation = await PropertyLocation.create({
        ...locationDetails,
        property: property._id
      });
      console.log("📍 Location created:", createdLocation);
    }

    // 3️⃣ Create Media Details (if provided)
    let createdMedia = null;
    if (mediaDetails) {
      createdMedia = await PropertyMedia.create({
        ...mediaDetails,
        property: property._id
      });
      console.log("🖼️ Media created:", createdMedia);
    }

    // ✅ Send full response back
    res.status(201).json({
      success: true,
      message: "Property created successfully",
      propertyId: property._id,
      data: {
        basicDetails: property,
        locationDetails: createdLocation || {},
        mediaDetails: createdMedia || {}
      }
    });

  } catch (error) {
    console.error("❌ Property creation error:", error);
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
    const { category, subCategory, locationDetails, mediaDetails } = req.body;

    console.log("Incoming Update Data:", req.body);

    // ✅ Validate category if provided
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // ✅ Validate subCategory if provided
    if (subCategory &&
      (!Array.isArray(subCategory) || !subCategory.every((sub) => allowedSubCategories.includes(sub)))) {
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    // ✅ Update Basic Property
    const updatedProperty = await BasicProperty.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // ✅ Update Location Details if provided
    let updatedLocation = null;
    if (locationDetails) {
      updatedLocation = await PropertyLocation.findOneAndUpdate(
        { property: id },
        locationDetails,
        { new: true, upsert: true }
      );
    }

    // ✅ Update Media Details if provided
    let updatedMedia = null;
    if (mediaDetails) {
      updatedMedia = await PropertyMedia.findOneAndUpdate(
        { property: id },
        mediaDetails,
        { new: true, upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: {
        basicDetails: updatedProperty,
        locationDetails: updatedLocation || {},
        mediaDetails: updatedMedia || {}
      }
    });
  } catch (error) {
    console.error("Error Updating Property:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getPropertyDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📥 [DEBUG] Incoming GET Request for property ID:", id);

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error("❌ [ERROR] Invalid property ID format:", id);
      return res.status(400).json({ success: false, message: "Invalid property ID format" });
    }

    // Fetch basic property details
    const basicDetails = await BasicProperty.findById(id);
    console.log("✅ [DEBUG] Basic Details:", basicDetails);

    // Fetch location details
    const locationDetails = await PropertyLocation.findOne({ property: id });
    console.log("✅ [DEBUG] Location Details:", locationDetails);

    // Fetch media details
    const mediaDetails = await PropertyMedia.findOne({ property: id });
    console.log("✅ [DEBUG] Media Details:", mediaDetails);

    // Handle property not found
    if (!basicDetails) {
      console.warn("⚠️ [WARN] Property not found for ID:", id);
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // Return full response
    const responseData = {
      success: true,
      data: {
        basicDetails,
        locationDetails: locationDetails || {},
        mediaDetails: mediaDetails || {},
      },
    };
    
    console.log("📤 [DEBUG] Full Response:", responseData);
    res.status(200).json(responseData);

  } catch (error) {
    console.error("🔥 [ERROR] Internal Server Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};



export const getAllPropertyController = async (req, res) => {
  try {
    const { category, subcategory } = req.body;

    let matchStage = {};
    if (category) matchStage.category = category;
    if (subcategory) matchStage.subCategory = { $in: [subcategory] };

    console.log("[DEBUG] Fetching properties with filter:", matchStage);

    const properties = await BasicProperty.aggregate([
      { $match: matchStage },

      // Lookup media
      {
        $lookup: {
          from: "propertymedia", // MongoDB collection name (always lowercase + plural)
          localField: "_id",
          foreignField: "property",
          as: "media"
        }
      },

      // Lookup location
      {
        $lookup: {
          from: "propertylocations",
          localField: "_id",
          foreignField: "property",
          as: "location"
        }
      }
    ]);

    if (!properties.length) {
      return res.status(404).json({ success: false, message: "No properties found" });
    }

    console.log(`[DEBUG] Fetched ${properties.length} properties`);
    res.status(200).json({ success: true, data: properties });

  } catch (error) {
    console.error("[ERROR] getAllPropertyController failed:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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

    // First find the document
    const property = await BasicProperty.findById(id);


    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // This will trigger the pre-remove hook if defined
    await property.deleteOne(); // triggers pre('deleteOne') if defined with {document: true}

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


export const getPropertiesByLocation = async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ success: false, message: "Location is required" });
  }

  // Normalize input: lowercase, remove hyphens, spaces, etc.
  const normalizedInput = location.toLowerCase().replace(/[^a-z0-9]/g, "");

  try {
    const properties = await BasicProperty.aggregate([
      // Join with PropertyLocation
      {
        $lookup: {
          from: "propertylocations", // must be lowercase plural of model name
          localField: "_id",
          foreignField: "property",
          as: "locationInfo"
        }
      },
      {
        $unwind: "$locationInfo"
      },
      {
        $addFields: {
          normalizedLocation: {
            $replaceAll: {
              input: { $toLower: "$locationInfo.location" },
              find: " ",
              replacement: ""
            }
          }
        }
      },
      {
        $addFields: {
          normalizedLocation: {
            $replaceAll: {
              input: "$normalizedLocation",
              find: "-",
              replacement: ""
            }
          }
        }
      },
      {
        $match: {
          normalizedLocation: normalizedInput
        }
      },
      // Optionally join media as well
      {
        $lookup: {
          from: "propertymedia",
          localField: "_id",
          foreignField: "property",
          as: "media"
        }
      }
    ]);

    if (!properties.length) {
      return res.status(404).json({
        success: false,
        message: "No properties found for this location"
      });
    }

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });

  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};





