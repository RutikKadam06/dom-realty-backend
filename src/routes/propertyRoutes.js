import express from "express";

import upload from "../middleware/upload.js";

import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);

router.post(
  "/",
  upload.array("images", 10),
  createProperty
);

router.put("/:id", updateProperty);

router.delete("/:id", deleteProperty);

export default router;