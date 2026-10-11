const express = require("express");

const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/imageUploadMiddleware");

const router = express.Router();

// Public
router.get("/", getProfile);

// Admin
router.post(
  "/",
  protect,
  upload.single("profileImage"),
  updateProfile
);

router.delete("/", protect, deleteProfile);

module.exports = router;