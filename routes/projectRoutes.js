const express = require("express");

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin-only routes
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;