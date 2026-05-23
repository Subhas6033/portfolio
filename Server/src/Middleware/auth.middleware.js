import jwt from "jsonwebtoken";
import { asyncHandeler, ApiError } from "../Utils/index.js";

const authMiddleware = asyncHandeler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.adminId = decoded.id;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

export default authMiddleware;