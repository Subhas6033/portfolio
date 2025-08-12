import React, { useState } from "react";
import { Button, ProjectCard } from "../../Components/index";
import { SlideInViewAnimation, SlideUpAnimation } from "../../utils/Animation";

const Project = () => {
  const [selectCategory, setSelectCategory] = useState("Frontend");

  const projectsNav = [
    {
      category: "Frontend",
    },
    {
      category: "Backend",
    },
    {
      category: "Fullstack",
    },
    {
      category: "Client Projects",
    },
  ];

  const projectData = [
    {
      category: "Frontend",
      imageURL: "./Projects/EV.jpeg",
      title: "Electric Vehicle Dashboard",
      description:
        "is a React-based web application that allows users to explore detailed information about electric vehicles. Users can view specifications, track vehicle data, and explore manufacturing history based on selected years for deeper insights.",
      githubLink: "https://github.com/Subhas6033/Electric-Vehicle-Dashboard",
      liveLink: "https://ev-eosin.vercel.app/",
    },
    {
      category: "Fullstack",
      imageURL: "./Projects/employee.png",
      title: "Employee Management System",
      description:
        "is a role-based web application that streamlines workplace operations with task assignment, real-time chat, and instant notifications. Designed to enhance collaboration between employees and co-workers while ensuring secure access control.",
      githubLink: "https://github.com/Subhas6033/Employee-Management-System",
      liveLink: "https://emsbysubhas.vercel.app/",
    },
    {
      category: "Frontend",
      imageURL: "./Projects/PanduAI.png",
      title: "PANDU the AI",
      description:
        "is an AI-powered personal assistant that can play songs, search the internet, and launch applications using your custom voice or text commands. I have to fix the issue or bug that is occuring here is about the height of the card.",
      githubLink: "https://github.com/Subhas6033/PANDU",
      liveLink: "https://pandutheai.netlify.app/",
    },
  ];

  const filteredProjects = projectData.filter(
    (project) => project.category === selectCategory
  );

  return (
    <SlideUpAnimation className={`min-h-screen `}>
      <div className="pt-10 md:pt-20">
        <ul className="flex justify-evenly items-center flex-wrap gap-3 md:gap-0">
          {projectsNav.map((nav) => (
            <li key={nav.category}>
              <Button
                children={nav.category}
                onClick={() => setSelectCategory(nav.category)}
                className={`font-gothic px-3 py-2 rounded-md border transition-all duration-300 hover:bg-gray-900 hover:cursor-pointer ${(selectCategory === nav.category) ? "text-slate-200 bg-amber-500" : "text-slate-300"}`}
              />
            </li>
          ))}
        </ul>

        {/* Project cards goes here  */}
        <div className="py-10 px-5 flex justify-evenly items-center flex-wrap gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((projects, index) => (
              <SlideInViewAnimation key={index}>
                <ProjectCard {...projects} />
              </SlideInViewAnimation>
            ))
          ) : (
            <p className="text-2xl text-white text-center pt-10">
              Currently no projects is available here
            </p>
          )}
        </div>
      </div>
    </SlideUpAnimation>
  );
};

export default Project;
