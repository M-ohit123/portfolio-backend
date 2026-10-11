const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("\nConnected to MongoDB\n");

    const admins = await Admin.find().select("name email");

    if (admins.length === 0) {
      console.log("❌ No admin found in database");
      process.exit(0);
    }

    console.log("Existing Admin Accounts:");
    console.log("--------------------------------");

    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.name} - ${admin.email}`);
    });

    console.log("--------------------------------");

    // YAHAN APNA ACTUAL ADMIN EMAIL LIKHO
    const email = "admin@gmail.com";

    // Temporary new password
    const newPassword = "Admin@123456";

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin) {
      console.log("\n❌ Admin with this email was not found:");
      console.log(email);
      process.exit(0);
    }

    admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();

    console.log("\n✅ PASSWORD RESET SUCCESSFULLY");
    console.log("--------------------------------");
    console.log("Email:", admin.email);
    console.log("New Password:", newPassword);
    console.log("--------------------------------\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
};

resetAdmin();