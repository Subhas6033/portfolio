import { SMTPClient } from "emailjs";
import { promisify } from "util";
import { asyncHandeler, ApiError, ApiResponse } from "../Utils/index.js";
import { Contact } from "../Models/Contact.models.js";

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true,
});

// Promisify the send function
const sendMail = promisify(client.send.bind(client));

const handleContactForm = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, subject, message } = req.body;

  if ([userName, email, mobileNumber, subject, message].some((f) => f.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // Prepare messages
  const adminMail = {
    text: `New contact form submission:\n
Name: ${userName}\n
Email: ${email}\n
Mobile: ${mobileNumber}\n
Message: ${message}`,
    from: `Website Contact Form <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    "reply-to": email,
    subject: `New Contact Form Submission: ${subject}`,
  };

  const userMail = {
    text: `Hello ${userName},

Thank you for reaching out to me.
I have received your message and will get back to you soon.

Here’s a copy of your message:
"${message}"

— Regards,
Subhas Mondal`,
    from: `Subhas Mondal <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We received your message: ${subject}`,
  };

  try {
    // Send both emails sequentially
    await sendMail(adminMail);
    await sendMail(userMail);

    // Save to DB after both succeed
    const dbDetails = await Contact.create({
      userName,
      email,
      mobileNumber,
      subject,
      message,
    });

    res.status(200).json(
      new ApiResponse(200, "Contact saved and emails sent successfully", dbDetails)
    );
  } catch (error) {
    console.error("Email or DB Error:", error);
    throw new ApiError(500, "Failed to send email or save contact");
  }
});

export { handleContactForm };
