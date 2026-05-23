import { Router } from "express";
import {
  getProfileImage,
  updateProfileImage,
} from "../Controllers/profileImage.controllers.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.get("/", getProfileImage);
router.put("/", authMiddleware, updateProfileImage);

export default router;