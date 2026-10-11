const Profile = require("../models/Profile");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE / UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      title,
      about,
      email,
      phone,
      location,
      linkedin,
      github,
      website,
    } = req.body;

    let profile = await Profile.findOne();

    let profileImage = profile?.profileImage || "";
    let profileImagePublicId =
      profile?.profileImagePublicId || "";

    // =========================
    // PROFILE IMAGE UPLOAD
    // =========================
    if (req.file) {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "portfolio/profile",
              resource_type: "image",
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

      // Delete old image from Cloudinary
      if (profileImagePublicId) {
        try {
          await cloudinary.uploader.destroy(
            profileImagePublicId,
            {
              resource_type: "image",
            }
          );
        } catch (deleteError) {
          console.log(
            "Old profile image delete error:",
            deleteError.message
          );
        }
      }

      profileImage = result.secure_url;
      profileImagePublicId = result.public_id;
    }

    // =========================
    // CREATE PROFILE
    // =========================
    if (!profile) {
      profile = await Profile.create({
        name,
        title,
        about,
        email,
        phone,
        location,
        linkedin,
        github,
        website,
        profileImage,
        profileImagePublicId,
      });
    }

    // =========================
    // UPDATE PROFILE
    // =========================
    else {
      profile.name = name;
      profile.title = title;
      profile.about = about;
      profile.email = email;
      profile.phone = phone;
      profile.location = location;
      profile.linkedin = linkedin;
      profile.github = github;
      profile.website = website;

      profile.profileImage = profileImage;
      profile.profileImagePublicId =
        profileImagePublicId;

      await profile.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE PROFILE
// =========================
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Delete image from Cloudinary
    if (profile.profileImagePublicId) {
      try {
        await cloudinary.uploader.destroy(
          profile.profileImagePublicId,
          {
            resource_type: "image",
          }
        );
      } catch (deleteError) {
        console.log(
          "Profile image delete error:",
          deleteError.message
        );
      }
    }

    await Profile.findByIdAndDelete(profile._id);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("Delete Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};