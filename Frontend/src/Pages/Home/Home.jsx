import React from "react";
import { FiDownload } from "react-icons/fi";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const Home = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-r from-[#7696CF] to-[#1B2549] flex items-center justify-center px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl">
        {/* Image Section — show first on mobile */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div className="w-40 h-40 md:w-96 md:h-96 rotate-45 transform-gpu rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <div className="-rotate-45 transform-gpu w-full h-full scale-[1.42]">
              <img
                src="./My Picture3.jpg"
                alt="My profile"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Text Section — show second on mobile */}
        <div className="space-y-6 text-white order-2 md:order-1">
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

          <div className="flex  flex-wrap justify-center gap-4 pt-4 md:pt-7">
            <button className="flex justify-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md">
              View My Work <LuSquareArrowOutUpRight />
            </button>
            <button className="flex items-center gap-2 border-2 border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md">
              <FiDownload /> Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
