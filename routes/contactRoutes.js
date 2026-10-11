const express = require("express");

const {
  sendContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
} = require("../controllers/contactController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.post("/", sendContactMessage);

// Admin only
router.get("/", protect, getContactMessages);
router.put("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteContactMessage);

module.exports = router;