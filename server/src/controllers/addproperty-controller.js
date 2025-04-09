import { validationResult } from "express-validator";
import { BasicProperty, PropertyLocation, PropertyMedia } from "../models/addproperty-model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs/promises';

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
    logTime("➡ Body:", JSON.stringify(req.body, null, 2));
    logTime("📦 Files:", Object.keys(req.files || {}));

    const {
      category, subCategory, city, title, location, sector,
      address, pincode, description, price, Rental_Yield,
      current_Rental, Area, Tenure, Tenant
    } = req.body;

    // Validate title
    if (!title || typeof title !== "string") {
      logTime("❌ Invalid or missing title");
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const normalizeTitle = (str) =>
      str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().replace(/\s/g, '');
    
    // Create normalized title for comparison
    const titleForComparison = normalizeTitle(title);
    logTime("🔍 Normalized title:", titleForComparison);

    console.time("⏱ Check for duplicates");
    const existingProperties = await BasicProperty.find({});
    console.timeEnd("⏱ Check for duplicates");

    const isDuplicate = existingProperties.some(property =>
      normalizeTitle(property.title) === titleForComparison
    );
    if (isDuplicate) {
      logTime("⚠ Duplicate title found");
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

    if (subCategory && !allowedSubCategories.includes(subCategory)) {
      logTime("❌ Invalid subCategory:", subCategory);
      return res.status(400).json({ success: false, message: "Invalid subCategory" });
    }

    const files = req.files || {};

    // Image handler
    const getImagePath = (fieldName) => {
      if (!files?.[fieldName]) return null;
      // Handle both single file and array of files
      const fileArray = Array.isArray(files[fieldName]) ? files[fieldName] : [files[fieldName]];
      return fileArray[0]?.path || null;
    };

    const getMultipleImagePaths = (fieldName) => {
      if (!files?.[fieldName]) return [];
      // Ensure we always work with an array
      const fileArray = Array.isArray(files[fieldName]) ? files[fieldName] : [files[fieldName]];
      return fileArray.map(file => file.path).filter(Boolean);
    };

    // Create basic property (without processing images)
    console.time("⏱ Create basic property");
    const property = await BasicProperty.create({
      category,
      subCategory,
      city,
      title: titleForComparison,
      price,
      Rental_Yield,
      current_Rental,
      Area,
      Tenure,
      Tenant,
      description,
      property_Image: getImagePath('property_Image'),
    });
    console.timeEnd("⏱ Create basic property");
    logTime("✅ Property created:", property._id);

    let createdLocation = null;
    if (location || address || pincode || sector) {
      try {
        console.time("⏱ Create location");
        // Create a location document with location, address, and pincode details.
        createdLocation = await PropertyLocation.create({
          property: property._id,   // Reference to the property document
          location: location,       // Example: "Whitefield"
          address: address || "",   // If address is provided in req.body, use it; otherwise default to an empty string
          pincode: pincode || "",   // Similarly, for pincode
          sector: sector || ""      // Add sector field
        });
        console.timeEnd("⏱ Create location");
        logTime("📍 Location created:", createdLocation._id);
        
        // Update the property with the location reference
        await BasicProperty.findByIdAndUpdate(property._id, {
          location: createdLocation._id
        });
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

    // // Determine dynamic Cloudinary folder (set in multer)
    // const dynamicFolder = files?.property_Image?.[0]?.folder || `properties/${titleForComparison}-${Date.now()}`;
    // logTime("📁 Dynamic Cloudinary folder:", dynamicFolder);

    // Handle logo image upload directly
    let logoImagePath = null;
    // if (files.logo_image && files.logo_image.length > 0) {
    //   try {
    //     logTime("📤 Uploading logo image directly to Cloudinary...");
    //     const result = await cloudinary.uploader.upload(files.logo_image[0].path, {
    //       folder: dynamicFolder,
    //       transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
    //     });
    //     logoImagePath = result.secure_url;
    //     logTime("✅ Logo image uploaded successfully:", logoImagePath);
        
    //     // Remove the local file after successful upload
    //     await fs.unlink(files.logo_image[0].path);
    //   } catch (error) {
    //     logTime("❌ Logo image upload failed:", error);
    //     // Continue with the rest of the process even if logo upload fails
    //   }
    // }

    // Create media document with the available file paths
    console.time("⏱ Create media");
    const createdMedia = await PropertyMedia.create({
      logo_image: logoImagePath || getImagePath('logo_image'),
      header_images: getMultipleImagePaths('header_images') || getImagePath('header_images'),
      about_image: getMultipleImagePaths('about_image'),
      highlight_image: getMultipleImagePaths('highlight_image'),
      gallery_image: getMultipleImagePaths('gallery_image'),
      floor_plans: floorPlans,
      property: property._id,
    });
    console.timeEnd("⏱ Create media");
    logTime("🎞 Media created:", createdMedia._id);
    
    // Update the property with the media reference
    await BasicProperty.findByIdAndUpdate(property._id, {
      media: createdMedia._id
    });

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

export const deletePropertyController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid property ID" });
    }

    const property = await BasicProperty.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // Delete associated records
    await PropertyLocation.deleteMany({ property: id });
    await PropertyMedia.deleteMany({ property: id });
    await BasicProperty.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Property and associated data deleted successfully"
    });
  } catch (error) {
    console.error("Delete property error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting property",
      error: error.message
    });
  }
};

export const getAllPropertyController = async (req, res) => {
  try {
    const properties = await BasicProperty.find()
      .populate('location', 'location address pincode')
      .populate('media', 'logo_image header_images about_image highlight_image gallery_image floor_plans')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error("Get all properties error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: error.message
    });
  }
};

export const getPropertiesByLocation = async (req, res) => {
  try {
    const { location } = req.body;
    
    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location parameter is required"
      });
    }

    // Find location documents that match the location parameter
    const locationDocs = await PropertyLocation.find({
      location: { $regex: new RegExp(location, 'i') }
    });

    // Get property IDs from the location documents
    const propertyIds = locationDocs.map(doc => doc.property);

    // Find properties with matching IDs
    const properties = await BasicProperty.find({
      _id: { $in: propertyIds }
    })
    .populate('location', 'location address pincode')
    .populate('media', 'logo_image header_image about_image highlight_image gallery_image floor_plans');

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error("Get properties by location error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching properties by location",
      error: error.message
    });
  }
};

export const getPropertyDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID format"
      });
    }

    const property = await BasicProperty.findById(id)
      .populate('location', 'location address pincode')
      .populate('media', 'logo_image header_image about_image highlight_image gallery_image floor_plans');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error("Get property details error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching property details",
      error: error.message
    });
  }
};

export const searchPropertiesController = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, location } = req.query;
    
    // Build search criteria
    const searchCriteria = {};
    
    if (query) {
      searchCriteria.title = { $regex: new RegExp(query, 'i') };
    }
    
    if (category && allowedCategories.includes(category)) {
      searchCriteria.category = category;
    }
    
    if (minPrice || maxPrice) {
      searchCriteria.price = {};
      if (minPrice) searchCriteria.price.$gte = parseFloat(minPrice);
      if (maxPrice) searchCriteria.price.$lte = parseFloat(maxPrice);
    }

    let properties;
    
    if (location) {
      // Find location documents that match the location
      const locationDocs = await PropertyLocation.find({
        location: { $regex: new RegExp(location, 'i') }
      });
      
      // Get property IDs from the location documents
      const propertyIds = locationDocs.map(doc => doc.property);
      
      // Add property IDs to search criteria
      searchCriteria._id = { $in: propertyIds };
    }

    // Execute search with populated fields
    properties = await BasicProperty.find(searchCriteria)
      .populate('location', 'location address pincode')
      .populate('media', 'logo_image header_image about_image highlight_image gallery_image floor_plans')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error("Search properties error:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching properties",
      error: error.message
    });
  }
};

export const updatePropertyController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID format"
      });
    }

    const property = await BasicProperty.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    const {
      category, subCategory, title, location, sector,
      address, pincode, description, price, Rental_Yield,
      current_Rental, Area, Tenure, Tenant
    } = req.body;

    // Validate category if provided
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // Validate subCategory if provided
    if (subCategory && !allowedSubCategories.includes(subCategory)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subCategory"
      });
    }

    // Update basic property details
    const updatedProperty = await BasicProperty.findByIdAndUpdate(
      id,
      {
        category: category || property.category,
        subCategory: subCategory || property.subCategory,
        title: title || property.title,
        description: description || property.description,
        price: price || property.price,
        Rental_Yield: Rental_Yield || property.Rental_Yield,
        current_Rental: current_Rental || property.current_Rental,
        Area: Area || property.Area,
        Tenure: Tenure || property.Tenure,
        Tenant: Tenant || property.Tenant
      },
      { new: true }
    );

    // Update location if provided
    if (location || address || pincode || sector) {
      await PropertyLocation.findOneAndUpdate(
        { property: id },
        {
          location: location,
          address: address,
          pincode: pincode,
          sector: sector
        },
        { new: true, upsert: true }
      );
    }

    // Handle file uploads if any
    const files = req.files || {};
    if (Object.keys(files).length > 0) {
      const getImagePath = (fieldName) =>
        files?.[fieldName]?.[0]?.path || null;
      const getMultipleImagePaths = (fieldName) =>
        (files?.[fieldName] || []).map(file => file.path);

      const mediaUpdate = {};
      
      if (files.logo_image) {
        mediaUpdate.logo_image = getImagePath('logo_image');
      }
      if (files.header_images) {
        mediaUpdate.header_image = getMultipleImagePaths('header_images');
      }
      if (files.about_image) {
        mediaUpdate.about_image = getMultipleImagePaths('about_image');
      }
      if (files.highlight_image) {
        mediaUpdate.highlight_image = getMultipleImagePaths('highlight_image');
      }
      if (files.gallery_image) {
        mediaUpdate.gallery_image = getMultipleImagePaths('gallery_image');
      }

      // Update media document
      await PropertyMedia.findOneAndUpdate(
        { property: id },
        mediaUpdate,
        { new: true, upsert: true }
      );

      // Queue image processing if needed
      if (files.logo_image) {
        await uploadQueue.add('upload-image', {
          fieldName: 'logo_image',
          filePath: files.logo_image[0].path,
          folder: `properties/${property.title}-${Date.now()}`
        });
      }
    }

    // Fetch updated property with populated fields
    const populatedProperty = await BasicProperty.findById(id)
      .populate('location', 'location address pincode sector')
      .populate('media', 'logo_image header_image about_image highlight_image gallery_image floor_plans');

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: populatedProperty
    });
  } catch (error) {
    console.error("Update property error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating property",
      error: error.message
    });
  }
};