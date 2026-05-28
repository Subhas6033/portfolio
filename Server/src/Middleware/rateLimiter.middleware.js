import rateLimit from "express-rate-limit";

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

export { contactLimiter };