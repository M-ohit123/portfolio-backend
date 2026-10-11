const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// ==========================================
// SEND CONTACT MESSAGE
// ==========================================

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Save message in MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : "",
      message: message.trim(),
    });

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Send email to portfolio owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,

      subject: `Portfolio Contact: ${subject || "New Message"}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 25px; border: 1px solid #ddd; border-radius: 12px;">

          <h2 style="margin-bottom: 20px;">
            New Portfolio Contact Message
          </h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Subject:</strong> ${subject || "No subject"}
          </p>

          <hr style="margin: 20px 0;" />

          <p>
            <strong>Message:</strong>
          </p>

          <p style="line-height: 1.7; white-space: pre-wrap;">
            ${message}
          </p>

        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Message could not be sent",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL CONTACT MESSAGES
// ==========================================

const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// MARK MESSAGE AS READ
// ==========================================

const markMessageAsRead = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    message.read = true;

    await message.save();

    res.status(200).json({
      success: true,
      message: "Message marked as read",
    });
  } catch (error) {
    console.error("Read Message Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE MESSAGE
// ==========================================

const deleteContactMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete Message Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
};