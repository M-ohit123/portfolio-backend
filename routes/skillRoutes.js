const express = require("express");

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getSkills);
router.get("/:id", getSkillById);

// Admin only
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;