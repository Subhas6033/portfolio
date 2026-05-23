import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  verifyAdmin,
} from "../Controllers/auth.controllers.js";

const router = Router();

// router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(logoutAdmin);
router.route("/verify").get(verifyAdmin);

export default router;
