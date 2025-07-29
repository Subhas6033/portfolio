import React from "react";
import { Image } from "../../Components/index";
import { FiDownload } from "react-icons/fi";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.section
      className="min-h-screen w-full bg-gradient-to-r from-[#7696CF] to-[#1B2549] flex items-center justify-center px-6 md:px-20 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl">
        {/* Image Section — show first on mobile */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 md:order-2"
        >
          <Image imageUrl={"./My Picture3.jpg"} alt={"My picture"} />
        </motion.div>

        {/* Text Section — show second on mobile */}
        <motion.div
          className="space-y-6 text-white order-2 md:order-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex justify-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md"
            >
              View My Work <LuSquareArrowOutUpRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 border-2 border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md"
            >
              <FiDownload /> Download Resume
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Home;
