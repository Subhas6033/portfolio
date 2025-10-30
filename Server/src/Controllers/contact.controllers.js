import emailjs from "@emailjs/nodejs";
import { asyncHandeler, ApiError, ApiResponse } from "../Utils/index.js";
import { Contact } from "../Models/Contact.models.js";

const handleContactForm = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, subject, message } = req.body;

  // Validate all fields
  if ([userName, email, mobileNumber, subject, message].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  //  Save contact in DB first
  const savedContact = await Contact.create({
    userName,
    email,
    mobileNumber,
    subject,
    message,
  });

  // Email data for templates
  const templateParams = {
    userName,
    email,
    mobileNumber,
    subject,
    message,
  };

  try {
    // Send confirmation email to user
    const userEmail = emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_USER_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey : process.env.EMAILJS_PRIVATE_KEY
      }
    );

    //  Send notification email to owner/admin
    const ownerEmail = emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_OWNER_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey : process.env.EMAILJS_PRIVATE_KEY
      }
    );

    await Promise.all([userEmail, ownerEmail]);

    res
      .status(200)
      .json(new ApiResponse(200, "Emails sent and contact saved successfully", savedContact));
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new ApiError(500, "Failed to send emails");
  }
});

export { handleContactForm };
