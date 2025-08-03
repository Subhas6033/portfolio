import React from "react";
import {
  FadeInSlideUpAnimation,
  ScaleUpAnimation,
  SlideUpAnimation,
} from "../../utils/Animation";

const Skill = () => {
  const skillItems = [
    {
      name: "C",
      category: "Language",
      logoURL: "./Skill/c.png",
    },
    {
      name: "CPP",
      category: "Language",
      logoURL: "./Skill/cpp.png",
    },
    {
      name: "Java",
      category: "Language",
      logoURL: "./Skill/java.png",
    },
    { name: "Python", category: "Language", logoURL: "./Skill/python.png" },

    {
      name: "HTML",
      category: "Frontend Tools",
      logoURL: "./Skill/html.png",
    },
    {
      name: "CSS",
      category: "Frontend Tools",
      logoURL: "./Skill/css.png",
    },
    {
      name: "JavaScript",
      category: "Frontend Tools",
      logoURL: "./Skill/javascript.png",
    },
    {
      name: "React JS",
      category: "Frontend Tools",
      logoURL: "./Skill/reactjs.png",
    },
    {
      name: "Redux Toolkit",
      category: "Frontend Tools",
      logoURL: "./Skill/redux.png",
    },
    {
      name: "Next JS",
      category: "Frontend Tools",
      logoURL: "./Skill/nextjs.png",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend Tools",
      logoURL: "./Skill/tailwind.png",
    },
    {
      name: "Bootstrap",
      category: "Frontend Tools",
      logoURL: "./Skill/bootstrap.png",
    },
    {
      name: "Daisy UI",
      category: "Frontend Tools",
      logoURL: "./Skill/daisyui.png",
    },
    {
      name: "Material UI",
      category: "Frontend Tools",
      logoURL: "./Skill/material.png",
    },
    {
      name: "Framer Motion",
      category: "Frontend Tools",
      logoURL: "./Skill/framer-motion.png",
    },
    {
      name: "Node JS",
      category: "Backend Tools",
      logoURL: "./Skill/nodejs.png",
    },
    {
      name: "Express JS",
      category: "Backend Tools",
      logoURL: "./Skill/expressjs.png",
    },
    {
      name: "MongoDB",
      category: "Backend Tools",
      logoURL: "./Skill/mongodb.png",
    },
    {
      name: "Appwrite",
      category: "Backend Tools",
      logoURL: "./Skill/appwrite.png",
    },
    {
      name: "VS Code",
      category: "Tools",
      logoURL: "./Skill/vs.png",
    },
    {
      name: "Vite",
      category: "Tools",
      logoURL: "./Skill/vite.png",
    },
    {
      name: "Figma",
      category: "Tools",
      logoURL: "./Skill/figma.png",
    },
    {
      name: "Git",
      category: "Tools",
      logoURL: "./Skill/git.png",
    },
    {
      name: "Github",
      category: "Tools",
      logoURL: "./Skill/github2.png",
    },
    {
      name: "Postman",
      category: "Tools",
      logoURL: "./Skill/postman.png",
    },
  ];

  const categories = ["Frontend Tools", "Backend Tools", "Language", "Tools"];

  return (
    <SlideUpAnimation className="min-h-screen px-4 py-10">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-4">
          <div className="w-fit border border-slate-600 bg-white/15 shadow-lg p-2 rounded-md flex justify-center items-center gap-3">
            <img
              src="./Skill/skills.png"
              alt="Skill logo"
              className="w-10 h-10"
            />
            <span className="text-5xl font-orbitron font-medium text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-amber-600">
              Skill
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((category, index) => (
          <SlideUpAnimation
            key={index}
            className="border bg-gray-900/80 border-white/10 rounded-xl p-6 shadow-md backdrop-blur-md"
          >
            <h3 className="text-transparent bg-clip-text  bg-[linear-gradient(to_bottom_right,_#facc15_20%,_#f97316_50%,_#d97706_100%)]  text-2xl font-semibold text-center mb-6 underline underline-offset-4 decoration-gray-200">
              {category}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 justify-items-center">
              {skillItems
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <ScaleUpAnimation key={index}>
                    <FadeInSlideUpAnimation
                      key={skill.name}
                      className="relative group p-3 bg-white/10 border border-white/10 rounded-lg transition-transform hover:cursor-pointer"
                    >
                      <img
                        src={skill.logoURL}
                        alt={skill.name}
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-sm text-white bg-black px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                        {skill.name}
                      </div>
                    </FadeInSlideUpAnimation>
                  </ScaleUpAnimation>
                ))}
            </div>
          </SlideUpAnimation>
        ))}
      </div>
    </SlideUpAnimation>
  );
};

export default Skill;
