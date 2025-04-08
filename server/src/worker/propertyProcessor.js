// src/worker/propertyProcessor.js
import { Worker } from 'bullmq';
import { redisClient } from "../utils/redisclient.js";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs/promises';

// Make sure Cloudinary is configured (could also import your utils/cloudinary.js)
import cloudinaryConfig from "../utils/cloudinary.js";

// Create Worker
const propertyProcessorWorker = new Worker('propertyUploadQueue', async job => {
  const { fieldName, filePath, folder } = job.data;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
    });
    console.log(`[${new Date().toISOString()}] ✅ Uploaded ${fieldName} to Cloudinary: ${result.secure_url}`);

    // Remove the local file after successful upload
    await fs.unlink(filePath);

    return { fieldName, url: result.secure_url };
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Upload failed for ${fieldName}:`, err);
    throw err;
  }
}, {
  connection: redisClient
});

propertyProcessorWorker.on("completed", job => {
  console.log(`[${new Date().toISOString()}] Job ${job.id} completed successfully.`);
});
propertyProcessorWorker.on("failed", (job, err) => {
  console.error(`[${new Date().toISOString()}] Job ${job.id} failed:`, err);
});

console.log(`[${new Date().toISOString()}] 🔁 Property Processor Worker is running...`);
