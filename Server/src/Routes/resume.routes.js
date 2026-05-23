import { Router } from 'express';
import { getResume, updateResume } from "../Controllers/resume.controllers.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.route("/").get(getResume).put(authMiddleware, updateResume);

export default router;