const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    startYear: {
      type: String,
      default: "",
    },

    endYear: {
      type: String,
      default: "",
    },

    grade: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    current: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Education", educationSchema);