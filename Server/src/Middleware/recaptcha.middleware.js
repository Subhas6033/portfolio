import axios from "axios";
import { ApiError } from "../Utils/index.js";

const verifyRecaptcha = async (req, res, next) => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    throw new ApiError(400, "Recaptcha token is required");
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    );

    // v2 checkbox only has `success` — no `score` field
    if (!response.data.success) {
      throw new ApiError(
        400,
        "Recaptcha verification failed. Please try again.",
      );
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, "Recaptcha verification failed.");
  }
};

export { verifyRecaptcha };
