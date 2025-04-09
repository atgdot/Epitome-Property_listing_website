// src/middleware/multer.js
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "general/default";
    // Determine folder based on form fields
    if (req.body.title) {
      // For property form, use title. It's a dynamic folder, unique per submission.
      const safeTitle = req.body.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]/g, '');
      folder = `properties/${safeTitle}-${Date.now()}`;
    } else if (req.body.agent && req.body.agentId) {
      folder = `agents/${req.body.agentId}`;
    } else if (req.body.user && req.body.userId) {
      folder = `users/${req.body.userId}`;
    } else if (req.body.name && req.body.Designation) {
      // For reviews/testimonials
      const safeName = req.body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]/g, '');
      folder = `reviews/${safeName}-${Date.now()}`;
    }
    
    // Store folder on request so you can access it in controller
    if (!req.uploadFolder) req.uploadFolder = folder;
    
    return {
      folder,
      format: 'webp',
      transformation: [
        { width: 200, height: 200, crop: 'fill' }, // Add specific transformation for profile photos
        { quality: 'auto' }, 
        { fetch_format: 'auto' }
      ],
    };
    } else if (file.fieldname === "license" || file.fieldname === "profileImage") {
      if (req.body.email) {
        const safeEmail = req.body.email.replace(/[^\w\-]/g, '');
        folder = `users/${safeEmail}-${Date.now()}`;
      } else {
        folder = `users/unknown-${Date.now()}`;
      }
    }
  },
});

const parser = multer({ storage: storage });

export default parser;