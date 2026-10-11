const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
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

module.exports = mongoose.model("Experience", experienceSchema);