import { SMTPClient } from "emailjs";
import { asyncHandeler, ApiError, ApiResponse } from "../Utils/index.js";
import { Contact } from "../Models/Contact.models.js";

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true,
});

const handleContactForm = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, subject, message } = req.body || {};
  console.log("Coming From Body : ", req.body)
  if (
    [userName, email, mobileNumber, subject, message].some(
      (field) => !field?.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required!!!");
  }

  try {
    // 1️⃣ Save to DB first
    const user = await Contact.create({
      userName,
      email,
      mobileNumber,
      subject,
      message,
    });

    if (!user) {
      throw new ApiError(502, "Cannot save the contact details in the DB!!");
    }

    console.log("✅ Successfully saved in DB:", user);

    // 2️⃣ Send emails (inside a try so DB save isn't blocked)
    try {
      // Email to ME
      await new Promise((resolve, reject) => {
        client.send(
          {
            text: `New contact form submission:\n
                   Name: ${userName}\n
                   Email: ${email}\n
                   Mobile: ${mobileNumber}\n
                   Message: ${message}`,
            from: `Website Contact Form <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            "reply-to": email,
            subject: `New Contact Form Submission: ${subject}`,
          },
          (err, messageInfo) => {
            if (err) return reject(err);
            resolve(messageInfo);
          }
        );
      });

      // Confirmation email to USER
      await new Promise((resolve, reject) => {
        client.send(
          {
            text: `Hello ${userName},\n\nThank you for reaching out to me.\nI have received your request and will get back to you soon.\n\nHere’s a copy of your message:\n"${message}"\n\n— Regards,\n Subhas Mondal`,
            from: `Subhas Mondal <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `We received your message: ${subject}`,
          },
          (err, messageInfo) => {
            if (err) return reject(err);
            resolve(messageInfo);
          }
        );
      });

      console.log("📧 Emails sent successfully");
    } catch (emailErr) {
      console.error("⚠️ Email sending failed:", emailErr);
      // Not throwing here so DB save still counts as success
    }

    // 3️⃣ Always respond success if DB save worked
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Contact saved successfully. Email attempt completed."
        )
      );
  } catch (dbErr) {
    console.error("❌ DB save failed:", dbErr);
    throw new ApiError(500, "Failed to save contact");
  }
});

export { handleContactForm };
