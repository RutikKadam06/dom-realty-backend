import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import propertyRoutes from "./routes/propertyRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DOM Realty API is running 🚀",
  });
});

app.use("/api/properties", propertyRoutes);

app.use("/api/enquiries", enquiryRoutes);

app.use("/api/auth", authRoutes);

export default app;