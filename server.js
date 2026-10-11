const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ===============================
// DATABASE
// ===============================
connectDB();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// HOME ROUTE
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Server is running",
  });
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/contact", contactRoutes);

// ===============================
// SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});