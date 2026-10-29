import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import configureCloudinary from "./config/cloudinary.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log(
  "Mongo URI Loaded:",
  process.env.MONGODB_URI ? "YES ✅" : "NO ❌"
);

console.log(
  "Cloudinary Cloud Name Loaded:",
  process.env.CLOUDINARY_CLOUD_NAME ? "YES ✅" : "NO ❌"
);

console.log(
  "Cloudinary API Key Loaded:",
  process.env.CLOUDINARY_API_KEY ? "YES ✅" : "NO ❌"
);

console.log(
  "Cloudinary API Secret Loaded:",
  process.env.CLOUDINARY_API_SECRET ? "YES ✅" : "NO ❌"
);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    configureCloudinary();

    app.listen(PORT, () => {
      console.log(`🚀 DOM Realty API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();