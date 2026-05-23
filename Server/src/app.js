import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import experienceRoutes from "./Routes/experience.routes.js";
import projectRoutes from "./Routes/project.routes.js";
import educationRoutes from "./Routes/education.routes.js";
import resumeRoutes from "./Routes/resume.routes.js";
import profileImageRoutes from "./Routes/profileImage.routes.js";
import authRoutes from "./Routes/auth.routes.js";
import contactRouter from "./Routes/contact.routes.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./Config/cloudinary.config.js";

const app = express();

// Enable CORS for the specific origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(cookieParser());

// Configuration for handelling the JSON data
app.use(
  express.json({
    limit: "100kb",
  }),
);

// Configuration for the URL data
app.use(
  express.urlencoded({
    limit: "100kb",
    extended: true,
  }),
);

// Mount uploadthing at app level to avoid conflicts with other routes
app.use("/api/resume/uploadthing", createRouteHandler({ router: uploadRouter }));
app.use("/api/profile/uploadthing", createRouteHandler({ router: uploadRouter }));
app.use("/api/education/uploadthing", createRouteHandler({ router: uploadRouter }));
app.use("/api/experiences/uploadthing", createRouteHandler({ router: uploadRouter }));
app.use("/api/projects/uploadthing", createRouteHandler({ router: uploadRouter }));

app.use("/api/v1", contactRouter);
app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/profile", profileImageRoutes);
app.use("/api/auth", authRoutes);

export { app };
