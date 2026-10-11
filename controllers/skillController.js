const Skill = require("../models/Skill");

// GET ALL SKILLS
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE SKILL
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE SKILL
const createSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      level,
      icon,
      featured,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Skill name and category are required",
      });
    }

    const skill = await Skill.create({
      name,
      category,
      level,
      icon,
      featured,
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SKILL
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE SKILL
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};