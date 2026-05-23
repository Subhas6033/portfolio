import './Config/loadenv.js'
import { app } from "./app.js";
import { connectDB } from "./DB/DB.js";
import experienceRoutes from "./Routes/experience.routes.js";
import projectRoutes from "./Routes/project.routes.js";
import educationRoutes from "./Routes/education.routes.js";
import resumeRoutes from "./Routes/resume.routes.js";
import authRoutes from "./Routes/auth.routes.js";

connectDB()
  .then(() => {
    app.use("/api/experiences", experienceRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/education", educationRoutes);
    app.use("/api/resume", resumeRoutes);
    app.use("/api/admin", authRoutes);

    app.get("/", (req, res) => {
      res.send("Welcome to my project");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is Running on PORT : ${
          process.env.PORT || 8000
        }`
      );
    });
  })
  .catch((err) => {
    console.log(`Unwanted ERR!! coming from index ${err}`);
  });