import jwt from "jsonwebtoken";
import { asyncHandeler, ApiError } from "../Utils/index.js";

const authMiddleware = asyncHandeler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

export default authMiddleware;
