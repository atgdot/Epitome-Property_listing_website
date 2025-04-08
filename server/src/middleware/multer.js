// src/middleware/multer.js
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: req.body.folder || 'properties/default',
    format: 'webp',
    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
  }),
});

const parser = multer({ storage: storage });

export default parser;
