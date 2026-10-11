const Education = require("../models/Education");

// =========================
// GET ALL EDUCATION
// =========================

const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({
      startYear: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: education.length,
      education,
    });
  } catch (error) {
    console.error("Get Education Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE EDUCATION
// =========================

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error("Get Education By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// CREATE EDUCATION
// =========================

const createEducation = async (req, res) => {
  try {
    const {
      institution,
      degree,
      field,
      location,
      startYear,
      endYear,
      grade,
      description,
      current,
    } = req.body;

    if (!institution || !degree) {
      return res.status(400).json({
        success: false,
        message: "Institution and degree are required",
      });
    }

    const education = await Education.create({
      institution: institution.trim(),
      degree: degree.trim(),
      field: field ? field.trim() : "",
      location: location ? location.trim() : "",
      startYear: startYear || "",
      endYear: endYear || "",
      grade: grade ? grade.trim() : "",
      description: description ? description.trim() : "",
      current: Boolean(current),
    });

    res.status(201).json({
      success: true,
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.error("Create Education Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE EDUCATION
// =========================

const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    const {
      institution,
      degree,
      field,
      location,
      startYear,
      endYear,
      grade,
      description,
      current,
    } = req.body;

    education.institution =
      institution !== undefined
        ? institution.trim()
        : education.institution;

    education.degree =
      degree !== undefined
        ? degree.trim()
        : education.degree;

    education.field =
      field !== undefined
        ? field.trim()
        : education.field;

    education.location =
      location !== undefined
        ? location.trim()
        : education.location;

    education.startYear =
      startYear !== undefined
        ? startYear
        : education.startYear;

    education.endYear =
      endYear !== undefined
        ? endYear
        : education.endYear;

    education.grade =
      grade !== undefined
        ? grade.trim()
        : education.grade;

    education.description =
      description !== undefined
        ? description.trim()
        : education.description;

    education.current =
      current !== undefined
        ? Boolean(current)
        : education.current;

    await education.save();

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    console.error("Update Education Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE EDUCATION
// =========================

const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    await Education.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete Education Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};