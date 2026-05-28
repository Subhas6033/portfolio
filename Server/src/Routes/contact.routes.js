import {Router} from 'express'
import { handleContactForm } from "../Controllers/contact.controllers.js";
import { contactLimiter } from "../Middleware/rateLimiter.middleware.js";
import { verifyRecaptcha } from "../Middleware/recaptcha.middleware.js";

const router = Router()

router.route("/contact").post(contactLimiter, verifyRecaptcha, handleContactForm);

export default router