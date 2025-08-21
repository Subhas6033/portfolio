import React from "react";
import {Link} from 'react-router-dom'
import {  Button, Skill, Project, ProfileImage } from "../../Components/index";
import { Eye } from 'lucide-react';
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { SlideLeftAnimation, SlideUpAnimation } from "../../utils/Animation";

const Home = () => {
  return (
    <>
      <SlideUpAnimation className="min-h-screen w-full flex items-center justify-center px-6 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl">
          {/* Image Section — show first on mobile */}
          <div className="order-1 md:order-2">
            <ProfileImage
              imageUrl={"./Image/My Picture3.jpg"}
              alt={"My picture"}
            />
          </div>

          {/* Text Section — show second on mobile */}
          <SlideLeftAnimation className="space-y-6 text-white order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Hi, I’m{" "}
              <span className="font-orbitron text-black drop-shadow-lg">
                Subhas
              </span>
            </h1>

            <p className="font-mono text-lg text-white/90">
              Full Stack Developer & AI/ML Enthusiast
            </p>

            <p className="text-sm md:text-base leading-relaxed text-white/80">
              I craft digital experiences that blend beautiful design with
              powerful functionality. Passionate about building scalable
              applications and innovative solutions that make a real impact.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4 md:pt-7">
              <Button
                className={`flex justify-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md hover:cursor-pointer`}
              >
                <span>
                  <Link to={'/projects'}>View my work</Link>
                </span>
                <span>
                  <LuSquareArrowOutUpRight />{" "}
                </span>
              </Button>

              <Button className="flex items-center gap-2 border-2 border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md hover:cursor-pointer">
                <span>
                  <Eye />
                </span>
                <span>
                  <Button
  onClick={() => {
    window.open("https://drive.google.com/file/d/1dILUENsijudLfQwSY3KTfhQbIWb4Ws9_/view?usp=drive_link")
  }}
>
   Resume
</Button>
                </span>
              </Button>
            </div>
          </SlideLeftAnimation>
        </div>
      </SlideUpAnimation>

      {/* Skill Section */}
      <div className="min-h-screen">
        <Skill />
        <Project />
      </div>
    </>
  );
};

export default Home;
