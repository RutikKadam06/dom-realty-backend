
import Property from "../models/Property.js";
import { cloudinary } from "../config/cloudinary.js";

// CREATE PROPERTY — images are optional
export const createProperty = async (req, res) => {
  try {
    console.log("📦 PROPERTY BODY:", req.body);

    const {
      title,
      category,
      location,
      village,
      taluka,
      district,
      pinCode,
      mapsLink,
      price,
      area,
      status,
      description,
      featured,
      roadTouch,
      features,
      expectedAppreciation,
      highwayDistance,
      railwayDistance,
      nearbyLandmark,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property title is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Property category is required.",
      });
    }

    if (!location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property location is required.",
      });
    }

    const parsedPrice =
      price === "" || price === null || price === undefined
        ? undefined
        : Number(price);

    if (
      parsedPrice !== undefined &&
      (!Number.isFinite(parsedPrice) || parsedPrice < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid property price.",
      });
    }

    let parsedFeatures = [];

    if (Array.isArray(features)) {
      parsedFeatures = features;
    } else if (typeof features === "string" && features.trim()) {
      try {
        const result = JSON.parse(features);
        parsedFeatures = Array.isArray(result) ? result : [];
      } catch {
        parsedFeatures = [];
      }
    }

    const propertyData = {
      title: title.trim(),
      category,
      location: location.trim(),
      village,
      taluka,
      district,
      pinCode,
      mapsLink,
      area,
      description,
      status: status || "Available",
      featured: featured === true || featured === "true",
      roadTouch: roadTouch === true || roadTouch === "true",
      features: parsedFeatures,
      images: [],
    };

    // Only save price when the client enters one.
    if (parsedPrice !== undefined) {
      propertyData.price = parsedPrice;
    }

    // Preserve optional investment fields if supplied.
    if (expectedAppreciation !== undefined) {
      propertyData.expectedAppreciation = expectedAppreciation;
    }

    if (highwayDistance !== undefined) {
      propertyData.highwayDistance = highwayDistance;
    }

    if (railwayDistance !== undefined) {
      propertyData.railwayDistance = railwayDistance;
    }

    if (nearbyLandmark !== undefined) {
      propertyData.nearbyLandmark = nearbyLandmark;
    }

    const property = await Property.create(propertyData);

    return res.status(201).json({
      success: true,
      message: "Property added successfully.",
      property,
    });
  } catch (error) {
    console.error("Property creation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create property.",
    });
  }
};

// GET ALL PROPERTIES
export const getProperties = async (req, res) => {
  try {
    const filter = {};

    if (req.query.featured === "true") {
      filter.featured = true;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const properties = await Property.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json(properties);
  } catch (error) {
    console.error("Fetch properties error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch properties.",
    });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.price === "") {
      updates.price = undefined;
    } else if (updates.price !== undefined) {
      updates.price = Number(updates.price);

      if (!Number.isFinite(updates.price) || updates.price < 0) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid property price.",
        });
      }
    }

    if (typeof updates.features === "string") {
      try {
        const parsed = JSON.parse(updates.features);
        updates.features = Array.isArray(parsed) ? parsed : [];
      } catch {
        updates.features = [];
      }
    }

    if (updates.featured !== undefined) {
      updates.featured =
        updates.featured === true || updates.featured === "true";
    }

    if (updates.roadTouch !== undefined) {
      updates.roadTouch =
        updates.roadTouch === true || updates.roadTouch === "true";
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Update property error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update property.",
    });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Delete Cloudinary images only if older records contain them.
    if (property.images?.length) {
      for (const image of property.images) {
        if (image.public_id) {
          try {
            await cloudinary.uploader.destroy(image.public_id);
          } catch (imageError) {
            console.error(
              "Cloudinary image deletion error:",
              imageError.message
            );
          }
        }
      }
    }

    await Property.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully.",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete property.",
    });
  }
};
