const express = require("express");

const {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getExperiences);
router.get("/:id", getExperienceById);

// ADMIN ONLY
router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

module.exports = router;