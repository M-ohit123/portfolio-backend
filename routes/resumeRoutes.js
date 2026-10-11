const express = require("express");

const {
  getResume,
  uploadResume,
  deleteResume,
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getResume);

router.post(
  "/",
  protect,
  upload.single("resume"),
  uploadResume
);

router.delete("/", protect, deleteResume);

module.exports = router;