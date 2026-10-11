const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary:", {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "MISSING",
  apiKey: process.env.CLOUDINARY_API_KEY ? "LOADED" : "MISSING",
  apiSecret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING",
});

module.exports = cloudinary;