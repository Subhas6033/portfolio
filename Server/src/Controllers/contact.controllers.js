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

  /*  const emailValidation = await validateEmailDomain(email);

  if (!emailValidation.valid) {
    throw new ApiError(400, emailValidation.reason);
  }
*/
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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message Received</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  color: #18181b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
">

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:#f5f5f5;"
  >
    <tr>
      <td align="center" style="padding: 48px 20px;">

        <!-- Email Container -->
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 560px;
            background: #ffffff;
            border: 1px solid #e4e4e7;
            border-radius: 8px;
          "
        >

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; border-bottom: 1px solid #e4e4e7;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td>
                    <p style="
                      margin: 0;
                      font-size: 17px;
                      line-height: 24px;
                      font-weight: 600;
                      color: #18181b;
                    ">
                      Subhas Mondal
                    </p>

                    <p style="
                      margin: 3px 0 0;
                      font-size: 13px;
                      line-height: 20px;
                      color: #71717a;
                    ">
                      Contact Form
                    </p>
                  </td>

                  <td align="right">
                    <span style="
                      display: inline-block;
                      padding: 5px 9px;
                      border: 1px solid #e4e4e7;
                      border-radius: 999px;
                      font-size: 11px;
                      line-height: 16px;
                      font-weight: 500;
                      color: #52525b;
                    ">
                      RECEIVED
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 32px 32px;">

              <h1 style="
                margin: 0 0 16px;
                font-size: 24px;
                line-height: 32px;
                font-weight: 600;
                letter-spacing: -0.4px;
                color: #18181b;
              ">
                Thanks for reaching out, ${userName}.
              </h1>

              <p style="
                margin: 0 0 28px;
                font-size: 15px;
                line-height: 24px;
                color: #52525b;
              ">
                Your message has been received successfully. I'll review it
                and get back to you as soon as possible.
              </p>

              <!-- Message -->
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  border: 1px solid #e4e4e7;
                  border-radius: 6px;
                "
              >
                <tr>
                  <td style="padding: 20px;">

                    <p style="
                      margin: 0 0 6px;
                      font-size: 11px;
                      line-height: 16px;
                      font-weight: 600;
                      letter-spacing: 0.6px;
                      text-transform: uppercase;
                      color: #71717a;
                    ">
                      Subject
                    </p>

                    <p style="
                      margin: 0 0 20px;
                      font-size: 15px;
                      line-height: 22px;
                      font-weight: 500;
                      color: #18181b;
                    ">
                      ${subject}
                    </p>

                    <p style="
                      margin: 0 0 6px;
                      font-size: 11px;
                      line-height: 16px;
                      font-weight: 600;
                      letter-spacing: 0.6px;
                      text-transform: uppercase;
                      color: #71717a;
                    ">
                      Message
                    </p>

                    <p style="
                      margin: 0;
                      font-size: 14px;
                      line-height: 23px;
                      color: #52525b;
                      white-space: pre-line;
                      word-break: break-word;
                    ">
                      ${message}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 24px;"
              >
                <tr>
                  <td style="
                    padding: 16px 0;
                    border-top: 1px solid #e4e4e7;
                    border-bottom: 1px solid #e4e4e7;
                  ">

                    <p style="
                      margin: 0;
                      font-size: 13px;
                      line-height: 20px;
                      color: #71717a;
                    ">
                      Contact number
                    </p>

                    <p style="
                      margin: 2px 0 0;
                      font-size: 14px;
                      line-height: 22px;
                      color: #27272a;
                    ">
                      ${mobileNumber}
                    </p>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding: 20px 32px;
              background: #fafafa;
              border-top: 1px solid #e4e4e7;
            ">

              <p style="
                margin: 0;
                font-size: 12px;
                line-height: 19px;
                color: #a1a1aa;
              ">
              This is an automatically generated email confirming that your message
              has been received. This is not a response to your enquiry. A separate
              reply will be sent after your message has been reviewed.
              </p>

              <p style="
                margin: 12px 0 0;
                font-size: 12px;
                line-height: 19px;
                color: #a1a1aa;
                text-align: center;
              ">
                © ${new Date().getFullYear()} Subhas Mondal
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
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
