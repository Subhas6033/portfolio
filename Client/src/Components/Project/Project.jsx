import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { Button } from "../index";
import { PopUpAnimation, SlideUpAnimation } from "../../utils/Animation";
import ProjectCard from "./ProjectCard";

const Project = () => {
  const navigate = useNavigate();

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

  return (
    <SlideUpAnimation className="mt-5 px-2 overflow-x-hidden">
      <PopUpAnimation className="text-center mt-5 mb-10">
        <p className="text-5xl font-orbitron font-medium text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-amber-600">
          Project
        </p>
      </PopUpAnimation>

      <div className="flex flex-col w-full md:flex-row justify-center items-center flex-wrap gap-10">
        {projectData.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>

      <PopUpAnimation className="mt-10 mb-20 flex justify-center items-center">
        <Button
          wrapperClass="bg-gray-950/90 border px-5 py-3 text-black rounded-lg"
          className="hover:cursor-pointer text-slate-200 text-lg font-gothic flex justify-center items-center gap-3"
          onClick={() => navigate("/projects")}
        >
          View More <FaArrowCircleRight />
        </Button>
      </PopUpAnimation>
    </SlideUpAnimation>
  );
};

export default Project;
