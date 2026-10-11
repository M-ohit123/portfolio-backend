const Experience = require("../models/Experience");

// GET ALL EXPERIENCES
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE EXPERIENCE
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE EXPERIENCE
const createExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      startDate,
      endDate,
      description,
      technologies,
      current,
    } = req.body;

    if (!company || !role || !startDate || !description) {
      return res.status(400).json({
        success: false,
        message: "Company, role, start date and description are required",
      });
    }

    const experience = await Experience.create({
      company,
      role,
      startDate,
      endDate,
      description,
      technologies,
      current,
    });

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE EXPERIENCE
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience: updatedExperience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EXPERIENCE
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    await Experience.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};