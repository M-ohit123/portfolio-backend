const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ======================================================
// GET CURRENT RESUME
// ======================================================

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get Resume Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPLOAD / UPDATE RESUME
// ======================================================

const uploadResume = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF file",
      });
    }

    // Check PDF
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    // Check size
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "PDF size must be less than 5MB",
      });
    }

    // Find existing resume
    const existingResume = await Resume.findOne();

    // ==================================================
    // UPLOAD TO CLOUDINARY
    // ==================================================

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              resource_type: "raw",
              folder: "portfolio/resume",
              public_id: "resume",
              overwrite: true,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });
    };

    const result = await uploadToCloudinary();

    // ==================================================
    // CREATE DOWNLOAD URL
    // ==================================================

    let downloadUrl = result.secure_url;

    if (downloadUrl) {
      downloadUrl = downloadUrl.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );
    }

    // ==================================================
    // DELETE OLD DATABASE RECORD
    // ==================================================

    if (existingResume) {
      await Resume.findByIdAndDelete(
        existingResume._id
      );
    }

    // ==================================================
    // SAVE NEW RESUME
    // ==================================================

    const resume = await Resume.create({
      fileName: req.file.originalname,
      fileUrl: downloadUrl,
      publicId: result.public_id,
    });

    // ==================================================
    // RESPONSE
    // ==================================================

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error(
      "Resume Upload Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE RESUME
// ======================================================

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Delete from Cloudinary
    if (resume.publicId) {
      await cloudinary.uploader.destroy(
        resume.publicId,
        {
          resource_type: "raw",
        }
      );
    }

    // Delete from MongoDB
    await Resume.findByIdAndDelete(
      resume._id
    );

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(
      "Resume Delete Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  getResume,
  uploadResume,
  deleteResume,
};