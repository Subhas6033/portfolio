import { Router } from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from "../Controllers/experience.controllers.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.route("/").get(getExperiences).post(authMiddleware, createExperience);
router.route("/:id").put(authMiddleware, updateExperience).delete(authMiddleware, deleteExperience);

export default router;