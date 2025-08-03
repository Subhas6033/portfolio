import React from "react";
import { Card, Button } from "../../Components/index";
import { ProfileImage } from "../../Components/profileImage/Image";
import { FiDownload } from "react-icons/fi";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import {
  FadeInSlideUpAnimation,
  SlideLeftAnimation,
} from "../../utils/Animation";

const Project = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-20 py-16 md:py-36 gap-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl">
        {/* Text Section - Left */}
        <SlideLeftAnimation className="space-y-6 text-white order-2 md:order-1">
          <span className="text-lg md:text-xl font-semibold">Hello,👋</span>
          <p className="text-sm md:text-base leading-relaxed">
            I'm <strong className="text-yellow-300">Subhas Mondal</strong>, from
            Kotulpur, West Bengal. I am a pre-final-year student pursuing a
            B.Tech. in Information Technology Dept. from Jalpaiguri Government
            Engineering College. I am proficient in{" "}
            <strong className="text-yellow-300">data structures</strong>,
            algorithms, and programming languages like{" "}
            <strong className="text-yellow-300">C++</strong>,{" "}
            <strong className="text-yellow-300">Java</strong>, and{" "}
            <strong className="text-yellow-300">Python</strong>. I'm also a{" "}
            <strong className="text-yellow-300">
              Full Stack (MERN & Next.js)
            </strong>{" "}
            and <strong className="text-yellow-300">React Native</strong>{" "}
            developer. I’m enthusiastic about software development and currently
            looking for an{" "}
            <strong className="text-yellow-300">internship</strong> or{" "}
            <strong className="text-yellow-300">full-time opportunity</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-center">
            <Button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md hover:cursor-pointer">
              View My Work <LuSquareArrowOutUpRight />
            </Button>
            <Button className="flex items-center gap-2 border-2 border-white text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all font-semibold shadow-md hover:cursor-pointer">
              <FiDownload /> Download Resume
            </Button>
          </div>
        </SlideLeftAnimation>

        {/* Image Section - Right */}
        <div className="order-1 md:order-2">
          <ProfileImage
            imageUrl={"./Image/My Picture3.jpg"}
            alt={"My picture"}
          />
        </div>
      </div>

      {/* Card Section */}
      <div className="mt-5 md:mt-16 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FadeInSlideUpAnimation>
          <Card
            cardClassName="min-h-[200px] w-full flex flex-col justify-between border border-white/20 backdrop-blur-md"
            shadow="shadow-lg"
            rounded="rounded-2xl"
            background="bg-white/10"
            padding="p-6"
          >
            <h1 className="text-xl font-bold mb-4 text-white underline">
              Language I Speak
            </h1>
            <ul className="list-disc list-inside text-sm text-white/90 space-y-1">
              <li>Bengali</li>
              <li>English</li>
              <li>Hindi</li>
            </ul>
          </Card>
        </FadeInSlideUpAnimation>

        <FadeInSlideUpAnimation>
          <Card
            cardClassName="min-h-[200px] w-full flex flex-col justify-between border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all duration-300"
            shadow="shadow-xl"
            rounded="rounded-2xl"
            background="bg-white/10"
            padding="p-6"
          >
            <h1 className="text-xl font-semibold mb-4 text-white underline">
              Personal Details
            </h1>
            <p className="text-sm text-white/90">
              📅 Date of Birth: 21/02/2025
            </p>
            <p className="text-sm text-white/90">📍 Place: Jalpaiguri</p>
          </Card>
        </FadeInSlideUpAnimation>

        <FadeInSlideUpAnimation>
          <Card
            cardClassName="min-h-[200px] w-full flex flex-col justify-between border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all duration-300"
            shadow="shadow-xl"
            rounded="rounded-2xl"
            background="bg-white/10"
            padding="p-6"
          >
            <h1 className="text-xl font-semibold mb-4 text-white underline">
              Coding Platforms
            </h1>
            <ul className="list-disc list-inside text-sm text-white/90 space-y-1">
              <li>LeetCode</li>
              <li>GeeksforGeeks</li>
              <li>Codeforces</li>
            </ul>
          </Card>
        </FadeInSlideUpAnimation>
      </div>
    </section>
  );
};

export default Project;
