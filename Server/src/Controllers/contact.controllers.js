import { SMTPClient } from "emailjs";
import { asyncHandeler, ApiError, ApiResponse } from "../Utils/index.js";

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true,
});

const handleContactForm = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, subject, message } = req.body || {};

  if (!userName || !email || !mobileNumber || !subject || !message) {
    throw new ApiError(400, "All fields are required!!!");
  }

  try {
    // Send email to ME
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

    // Send confirmation email to USER
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

    res
      .status(200)
      .json(new ApiResponse(200, "Contact saved and emails sent successfully"));
  } catch (error) {
    console.error("Error while sending the message:", error);
    throw new ApiError(500, "Failed to send email");
  }
});

export { handleContactForm };
