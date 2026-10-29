const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

function requiredInProduction(name) {
  const value = process.env[name];
  if (process.env.NODE_ENV === "production" && !value) {
    throw new Error(`${name} is required in production`);
  }
  return value || "";
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminName: process.env.ADMIN_NAME || "DOM Realty Admin",
  adminEmail: process.env.ADMIN_EMAIL || "admin@domreality.in",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  email: {
    host: process.env.EMAIL_HOST || "",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    user: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    from: process.env.EMAIL_FROM || "DOM Realty <info@domreality.in>",
    notify: process.env.ADMIN_NOTIFY_EMAIL || "info@domreality.in",
  },
  recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY || "",
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY || "",
};

module.exports = { env, requiredInProduction };
