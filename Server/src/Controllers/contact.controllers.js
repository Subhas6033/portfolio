import emailjs from "@emailjs/nodejs";
import {
  asyncHandeler,
  ApiError,
  ApiResponse,
} from "../Utils/index.js";

import { Contact } from "../Models/Contact.models.js";

import { validateEmailDomain } from "../Validation/mailValidate.js";

const handleContactForm = asyncHandeler(
  async (req, res) => {
    const {
      userName,
      email,
      mobileNumber,
      subject,
      message,
    } = req.body;


    if (
      [
        userName,
        email,
        mobileNumber,
        subject,
        message,
      ].some((f) => !f || f.trim() === "")
    ) {
      throw new ApiError(
        400,
        "All fields are required!"
      );
    }

    // Main validation logic
    const emailValidation =
      await validateEmailDomain(email);

    if (!emailValidation.valid) {
      throw new ApiError(
        400,
        emailValidation.reason
      );
    }

    const savedContact = await Contact.create({
      userName,
      email,
      mobileNumber,
      subject,
      message,
    });


    const templateParams = {
      userName,
      email,
      mobileNumber,
      subject,
      message,
    };

    try {
      // Send user confirmation email
      const userEmail = emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_USER_TEMPLATE_ID,
        templateParams,
        {
          publicKey:
            process.env.EMAILJS_PUBLIC_KEY,
          privateKey:
            process.env.EMAILJS_PRIVATE_KEY,
        }
      );

// Send owner/admin notification
      const ownerEmail = emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_OWNER_TEMPLATE_ID,
        templateParams,
        {
          publicKey:
            process.env.EMAILJS_PUBLIC_KEY,
          privateKey:
            process.env.EMAILJS_PRIVATE_KEY,
        }
      );

      await Promise.all([
        userEmail,
        ownerEmail,
      ]);

      return res.status(200).json(
        new ApiResponse(
          200,
          "Emails sent and contact saved successfully",
          savedContact
        )
      );
    } catch (error) {
      console.error(
        "EmailJS Error:",
        error
      );

      throw new ApiError(
        500,
        "Failed to send emails"
      );
    }
  }
);

export { handleContactForm };