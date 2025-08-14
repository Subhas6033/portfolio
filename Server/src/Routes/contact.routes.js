import {Router} from 'express'
import { handleContactForm } from "../Controllers/contact.controllers.js";

const router = Router()

router.route("/contact").post(handleContactForm);

export default router