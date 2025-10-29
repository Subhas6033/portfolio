import { Resend } from "resend";
import { asyncHandeler, ApiError, ApiResponse } from "../Utils/index.js";
import { Contact } from "../Models/Contact.models.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const handleContactForm = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, subject, message } = req.body;

  console.log("Coming From the Body:", userName, email, mobileNumber, subject, message);

  // Validate fields
  if ([userName, email, mobileNumber, subject, message].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // Prepare emails
  const adminMail = {
    from: process.env.EMAIL_FROM || "Website Contact Form <onboarding@resend.dev>",
    to: process.env.EMAIL_FROM || "youremail@example.com",
    subject: `New Contact Form Submission: ${subject}`,
    text: `
New contact form submission:

Name: ${userName}
Email: ${email}
Mobile: ${mobileNumber}
Message: ${message}
    `,
  };

  const userMail = {
    from: process.env.EMAIL_FROM || "Subhas Mondal <onboarding@resend.dev>",
    to: email,
    subject: `We received your message: ${subject}`,
    text: `Hello ${userName},

Thank you for reaching out to me.
I have received your message and will get back to you soon.

Here’s a copy of your message:
"${message}"

— Regards,
Subhas Mondal`,
  };

  try {
    // Send both emails sequentially
    await resend.emails.send(adminMail);
    await resend.emails.send(userMail);

    // Save to DB after both succeed
    const dbDetails = await Contact.create({
      userName,
      email,
      mobileNumber,
      subject,
      message,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Contact saved and emails sent successfully", dbDetails));
  } catch (error) {
    console.error("Email or DB Error:", error);

    if (error.message?.includes("quota") || error.message?.includes("limit")) {
      throw new ApiError(429, "Email quota exceeded. Please try again later.");
    }

    throw new ApiError(500, error.message || "Failed to send email or save contact");
  }
});

export { handleContactForm };
