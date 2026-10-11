const express = require("express");

const {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getEducation);
router.get("/:id", getEducationById);

// ADMIN ONLY
router.post("/", protect, createEducation);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);

module.exports = router;