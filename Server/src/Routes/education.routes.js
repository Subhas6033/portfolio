import { Router } from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from "../Controllers/education.controllers.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.route("/").get(getEducation).post(authMiddleware, createEducation);
router.route("/:id").put(authMiddleware, updateEducation).delete(authMiddleware, deleteEducation);

export default router;