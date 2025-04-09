import { validationResult } from "express-validator";
import { BasicProperty, PropertyLocation, PropertyMedia } from "../models/addproperty-model.js";
import mongoose from "mongoose";
//import { uploadQueue } from "../utils/redisclient.js"; // BullMQ queue

const allowedCategories = ["Residential", "Commercial", "Featured", "Trending"];
const allowedSubCategories = [
  "Luxury Project", "Upcoming Project", "High Rise Apartment",
  "Offices", "Pre Leased Offices", "Pre-Rented", "SCO"
];

const logTime = (...args) => console.log(`[${new Date().toISOString()}]`, ...args);

export const createPropertyController = async (req, res) => {
  console.time("⏱ Total request time");

  try {
    logTime("📥 Received create property request");
    logTime("➡️ Body:", JSON.stringify(req.body, null, 2));
    logTime("📦 Files:", Object.keys(req.files || {}));

    const {
      category, subCategory, city, title, location, sector,
      address, pincode, description, price, Rental_Yeild,
      current_Rental, Area, Tenure, Tenant
    } = req.body;

    // Validate title
    if (!title || typeof title !== "string") {
      logTime("❌ Invalid or missing title");
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const normalizeTitle = (str) =>
      str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().replace(/\s/g, '');
    const normalizedTitle = normalizeTitle(title);
    logTime("🔍 Normalized title:", normalizedTitle);

    console.time("⏱ Check for duplicates");
    const existingProperties = await BasicProperty.find({});
    console.timeEnd("⏱ Check for duplicates");

    const isDuplicate = existingProperties.some(property =>
      normalizeTitle(property.title) === normalizedTitle
    );
    if (isDuplicate) {
      logTime("⚠️ Duplicate title found");
      return res.status(409).json({ 
        success: false, 
        message: "A property with a similar title already exists",
        suggestion: "Please use a more distinct title"
      });
    }

    if (!allowedCategories.includes(category)) {
      logTime("❌ Invalid category:", category);
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    if (subCategory && subCategory.length > 0) {
      const isValid = subCategory.every(sub => allowedSubCategories.includes(sub));
      if (!isValid) {
        logTime("❌ Invalid subCategory:", subCategory);
        return res.status(400).json({ success: false, message: "Invalid subCategory" });
      }
    }

    const files = req.files || {};

    // Image handler
    const getImagePath = (fieldName) =>
      files?.[fieldName]?.[0]?.path || null;
    const getMultipleImagePaths = (fieldName) =>
      (files?.[fieldName] || []).map(file => file.path);

    // Create basic property (without processing images)
    console.time("⏱ Create basic property");
    const property = await BasicProperty.create({
      category,
      subCategory,
      city,
      title: normalizedTitle,
      sector,
      description,
      price,
      Rental_Yeild,
      current_Rental,
      Area,
      Tenure,
      Tenant,
      property_Image: getImagePath('property_Image'),
    });
    console.timeEnd("⏱ Create basic property");
    logTime("✅ Property created:", property._id);

    let createdLocation = null;
    if (location) {
    try {
        console.time("⏱ Create location");
        // Create a location document with location, address, and pincode details.
        createdLocation = await PropertyLocation.create({
        property: property._id,   // Reference to the property document
        location: location,       // Example: "Whitefield"
        address: address || "",   // If address is provided in req.body, use it; otherwise default to an empty string
        pincode: pincode || ""      // Similarly, for pincode
      });
      console.timeEnd("⏱ Create location");
      logTime("📍 Location created:", createdLocation._id);
    } catch (locErr) {
    // Log the error but continue if location creation is not critical
    logTime("❌ Failed to create location:", locErr.message);
    }
    }


    // Prepare floor plans data
    const floorPlans = [];
    const floorPlanImages = getMultipleImagePaths('floor_plan_images');
    const planDescriptions = Array.isArray(req.body.floor_plan_descriptions)
      ? req.body.floor_plan_descriptions
      : [req.body.floor_plan_descriptions || ""];
    const planAreas = Array.isArray(req.body.floor_plan_areas)
      ? req.body.floor_plan_areas
      : [req.body.floor_plan_areas || 0];

    floorPlanImages.forEach((img, i) => {
      floorPlans.push({
        description: planDescriptions[i] || "",
        area: planAreas[i] || 0,
        image: img
      });
    });

    // Determine dynamic Cloudinary folder (set in multer)
    // Note: CloudinaryStorage may not always attach a folder property to the file object.
    // If not, compute it based on normalizedTitle.
    const dynamicFolder = files?.property_Image?.[0]?.folder || `properties/${normalizedTitle}-${Date.now()}`;
    logTime("📁 Dynamic Cloudinary folder:", dynamicFolder);


    // Enqueue a job for heavy image processing (example for logo_image)
    // if (files.logo_image && files.logo_image.length > 0) {
    //   logTime("📤 Attempting to enqueue image upload job...");
    //   await uploadQueue.add('upload-image', {
    //     fieldName: 'logo_image',
    //     filePath: files.logo_image[0].path,
    //     folder: dynamicFolder,
    //   });
    //   logTime("🚀 Enqueued logo image upload job");
    // }

    // Create media document with the available file paths
    console.time("⏱ Create media");
    const createdMedia = await PropertyMedia.create({
      logo_image: getImagePath('logo_image'),
      header_image: getMultipleImagePaths('header_images'),
      about_image: getMultipleImagePaths('about_image'),
      highlight_image: getMultipleImagePaths('highlight_image'),
      gallery_image: getMultipleImagePaths('gallery_image'),
      floor_plans: floorPlans,
      folder_path: dynamicFolder,  // Save folder path for future reference
      property: property._id,
    });
    console.timeEnd("⏱ Create media");
    logTime("🎞️ Media created:", createdMedia._id);

    console.timeEnd("⏱ Total request time");
    return res.status(201).json({
      success: true,
      message: "Property created successfully. Image processing is being handled asynchronously.",
      propertyId: property._id,
      data: {
        basicDetails: property,
        locationDetails: createdLocation || {},
        mediaDetails: createdMedia || {}
      }
    });

  } catch (error) {
    console.timeEnd("⏱ Total request time");
    console.error("❌ Property creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the property.",
      error: error.message || JSON.stringify(error)
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

  try {
    const properties = await BasicProperty.aggregate([
      // Join with PropertyLocation
      {
        $lookup: {
          from: "propertylocations",
          localField: "_id",
          foreignField: "property",
          as: "locationInfo"
        }
      },
      {
        $unwind: {
          path: "$locationInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          "locationInfo.location": location
        }
      },

      // Join with PropertyMedia
      {
        $lookup: {
          from: "propertymedia",
          localField: "_id",
          foreignField: "property",
          as: "media"
        }
      },
      {
        $unwind: {
          path: "$media",
          preserveNullAndEmptyArrays: true
        }
      },

      // Optional project for cleaner response
      {
        $project: {
          title: 1,
          description: 1,
          category: 1,
          subCategory: 1,
          city: 1,
          price: 1,
          Rental_Yield: 1,
          current_Rental: 1,
          Area: 1,
          Tenure: 1,
          Tenant: 1,
          property_Image: 1,
          media: 1,
          location: "$locationInfo"
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
