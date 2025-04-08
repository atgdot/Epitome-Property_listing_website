// src/utils/redisclient.js
import { Queue } from 'bullmq';
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
await redisClient.connect();

const uploadQueue = new Queue('propertyUploadQueue', {
  connection: redisClient,
});

export { redisClient, uploadQueue };
