import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from "../Controllers/project.controllers.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.route("/").get(getProjects).post(authMiddleware, createProject);
router.route("/:id").put(authMiddleware, updateProject).delete(authMiddleware, deleteProject);

export default router;