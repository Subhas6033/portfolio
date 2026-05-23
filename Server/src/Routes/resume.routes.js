import { Router } from "express";
import {
  getResume,
  updateResume,
  deleteResume,
} from "../Controllers/resume.controllers.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

// Note: uploadthing route is now mounted at app level in app.js

router.get("/", getResume);
router.put("/", authMiddleware, updateResume);
router.delete("/", authMiddleware, deleteResume);

export default router;
