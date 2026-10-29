import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    village: {
      type: String,
    },

    taluka: {
      type: String,
    },

    district: {
      type: String,
    },

    pinCode: {
      type: String,
    },

    mapsLink: {
      type: String,
    },

    price: {
      type: Number,
    },

    area: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Reserved"],
      default: "Available",
    },

    description: {
      type: String,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    roadTouch: {
      type: Boolean,
      default: false,
    },

    features: {
      type: [String],
      default: [],
    },

    expectedAppreciation: {
      type: String,
    },

    highwayDistance: {
      type: String,
    },

    railwayDistance: {
      type: String,
    },

    nearbyLandmark: {
      type: String,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model(
  "Property",
  propertySchema
);

export default Property;