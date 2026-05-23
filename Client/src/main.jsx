import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, About, Project, Contact, Achievements, ProjectDetail, Experience } from "./Pages/index.js";
import RouteTitleUpdater from "./Components/RouteTitleUpdater.jsx";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminExperiences from "./Pages/Admin/AdminExperiences";
import AdminProjects from "./Pages/Admin/AdminProjects";
import AdminEducation from "./Pages/Admin/AdminEducation";
import AdminResume from "./Pages/Admin/AdminResume";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/achievement",
        element: <Achievements />,
      },
      {
        path: "/projects",
        element: <Project />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "experiences", element: <AdminExperiences /> },
          { path: "projects", element: <AdminProjects /> },
          { path: "education", element: <AdminEducation /> },
          { path: "resume", element: <AdminResume /> },
        ]
      },
      { path: "/admin/login", element: <AdminLogin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={Router} />
  </StrictMode>
);
