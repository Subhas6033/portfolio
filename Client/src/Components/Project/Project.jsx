import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { Button } from "../index";
import { PopUpAnimation, SlideUpAnimation } from "../../utils/Animation";
import ProjectCard from "./ProjectCard";

const Project = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjectData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
