import express from "express";
import {
  createEnquiry,
  getEnquiries,
} from "../controllers/enquiryController.js";

const router = express.Router();

// Customer submits enquiry
router.post("/", createEnquiry);

// Admin gets all enquiries
router.get("/", getEnquiries);

export default router;