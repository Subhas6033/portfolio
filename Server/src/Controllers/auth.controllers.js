import jwt from "jsonwebtoken";
import { Admin } from "../Models/Admin.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";

const registerAdmin = asyncHandeler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists");
  }

  const admin = await Admin.create({ username, password });

  return res.status(201).json(new ApiResponse(201, { id: admin._id, username: admin.username }, "Admin registered"));
});

const loginAdmin = asyncHandeler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isValid = await admin.comparePassword(password);
  if (!isValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );

  return res.status(200).json(new ApiResponse(200, { token, username: admin.username }, "Login successful"));
});

export { registerAdmin, loginAdmin };