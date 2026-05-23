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

const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: admin._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

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

  const { accessToken, refreshToken } = generateTokens(admin);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(new ApiResponse(200, { username: admin.username }, "Login successful"));
});

const refreshAccessToken = asyncHandeler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    throw new ApiError(401, "Admin not found");
  }

  const { accessToken } = generateTokens(admin);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
});

const logoutAdmin = asyncHandeler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});

const verifyAdmin = asyncHandeler(async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Not authenticated");
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    throw new ApiError(401, "Admin not found");
  }

  return res.status(200).json(new ApiResponse(200, { username: admin.username }, "Authenticated"));
});

export { registerAdmin, loginAdmin, refreshAccessToken, logoutAdmin, verifyAdmin };