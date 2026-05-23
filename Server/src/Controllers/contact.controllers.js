import nodemailer from "nodemailer";
import { asyncHandeler, ApiError, ApiResponse } from "../Utils/index.js";

import { Contact } from "../Models/Contact.models.js";
import { validateEmailDomain } from "../Validation/mailValidate.js";

// Create transporter once (reused across requests)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.OWNER_EMAIL_PASSWORD,
  },
});

const handleContactForm = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, subject, message } = req.body;

  if (
    [userName, email, mobileNumber, subject, message].some(
      (f) => !f || f.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // const emailValidation = await validateEmailDomain(email);

  if (!emailValidation.valid) {
    throw new ApiError(400, emailValidation.reason);
  }

  const savedContact = await Contact.create({
    userName,
    email,
    mobileNumber,
    subject,
    message,
  });

  // Email to the USER — confirmation
  const userMailOptions = {
    from: `"Subhas Mondal" <${process.env.OWNER_EMAIL}>`,
    to: email,
    subject: `We received your message — ${subject}`,
    html: `
      <h2>Hi ${userName},</h2>
      <p>Thanks for reaching out! We've received your message and will get back to you shortly.</p>
      <hr />
      <p><strong>Your Message:</strong></p>
      <p>${message}</p>
      <hr />
      <p>📞 Mobile: ${mobileNumber}</p>
    `,
  };

  // Email to YOU (admin/owner) — notification
  const ownerMailOptions = {
    from: `"Subhas Mondal" <${process.env.OWNER_EMAIL}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h2>New message from ${userName}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobileNumber}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(ownerMailOptions),
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Emails sent and contact saved successfully",
          savedContact,
        ),
      );
  } catch (error) {
    console.error("Nodemailer Error:", error);

    throw new ApiError(
      500,
      `Failed to send emails: ${error?.message || "Unknown error"}`,
    );
  }
});

export { handleContactForm };
