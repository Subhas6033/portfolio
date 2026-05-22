import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Eye,
  MapPin,
  Calendar,
  Code,
  Globe,
  Award,
} from "lucide-react";
import { Timeline, ProfileImage } from "../../Components/index";
import { SlideLeftAnimation, SlideUpAnimation } from "../../utils/Animation";
import { KEYFRAMES } from "../../Components/ui/animations";

const educationData = [
  {
    title: "B.Tech in IT",
    institution: "Jalpaiguri Government Engineering College",
    period: "2023 - 2027",
    description:
      "Pursuing B.Tech in Information Technology department. Secured 7.2 DGPA with focus on software development and web technologies.",
    resultUrl:
      "https://drive.google.com/file/d/12zrDxno-YFq3RrKnvk2-TdJtauOabt5P/view?usp=sharing",
    align: "left",
  },
  {
    title: "Higher Secondary",
    institution: "Kotalpur High School",
    period: "2020 - 2022",
    description:
      "Science stream with Physics, Chemistry, Mathematics, and Biology. Secured 372 out of 500 marks, affiliated with WBCHSE.",
    resultUrl:
      "https://drive.google.com/file/d/14KT2z0JYxmaf2iPtcBrxO7hcE64aPLHc/view?usp=sharing",
    align: "right",
  },
  {
    title: "Secondary",
    institution: "Balitha High School",
    period: "2015 - 2020",
    description:
      "Secured 647 out of 700 marks, affiliated with West Bengal Council of Higher Secondary Education.",
    resultUrl:
      "https://drive.google.com/file/d/1lWRINT_aThbhnxO0rt8oOEtvua-4USuS/view?usp=sharing",
    align: "left",
  },
];

const About = () => {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(163,230,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.03) 1px,transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="anim-fadeUp mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
                style={{ animation: "pulseGlow 2.5s ease-in-out infinite" }}
              >
                <div className="w-2 h-2 bg-lime-400 rounded-sm" />
              </div>
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                About Me
              </span>
            </div>
            <h1
              className="font-black text-white tracking-tighter leading-none mb-4"
              style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
            >
              Get to <span className="shimmer-text">Know Me</span>
            </h1>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Text Content */}
            <div className="order-1 space-y-6">
              <SlideLeftAnimation>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Hello!{" "}
                  <span className="text-lime-400">I'm Subhas Mondal</span>, from
                  Kotulpur, West Bengal. I am a pre-final-year student pursuing
                  <span className="text-lime-400">
                    {" "}
                    B.Tech in Information Technology
                  </span>{" "}
                  from Jalpaiguri Government Engineering College.
                </p>
              </SlideLeftAnimation>

              <SlideLeftAnimation>
                <p className="text-zinc-400 leading-relaxed">
                  I am proficient in{" "}
                  <span className="text-white font-semibold">
                    data structures
                  </span>{" "}
                  and
                  <span className="text-white font-semibold"> algorithms</span>,
                  and programming languages like
                  <span className="text-white font-semibold"> C++</span>,{" "}
                  <span className="text-white font-semibold">Java</span>, and{" "}
                  <span className="text-white font-semibold">Python</span>. I'm
                  also a{" "}
                  <span className="text-lime-400 font-semibold">
                    Full Stack Developer
                  </span>{" "}
                  specializing in MERN & Next.js and{" "}
                  <span className="text-white font-semibold">React Native</span>{" "}
                  development.
                </p>
              </SlideLeftAnimation>

              <SlideLeftAnimation>
                <p className="text-zinc-400 leading-relaxed">
                  I'm enthusiastic about software development and currently
                  looking for an{" "}
                  <span className="text-lime-400 font-semibold">
                    internship
                  </span>{" "}
                  or{" "}
                  <span className="text-lime-400 font-semibold">
                    full-time opportunity
                  </span>
                  .
                </p>
              </SlideLeftAnimation>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to={"/projects"}
                  className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 font-bold text-sm px-6 py-3 rounded-full hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.35)] transition-all duration-300"
                >
                  View My Work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <button
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1Du7IFCujKnLB4m3vwFuowdjJYCsFQIgg/view?usp=sharing",
                    )
                  }
                  className="inline-flex items-center gap-2 border-2 border-zinc-700 text-zinc-300 font-bold text-sm px-6 py-3 rounded-full hover:border-lime-400/50 hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
                >
                  <Eye size={16} />
                  Resume
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="order-2">
              <ProfileImage
                imageUrl={"./Image/My Picture3.jpg"}
                alt={"My picture"}
              />
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <SlideUpAnimation>
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/60 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={20} className="text-lime-400" />
                  <h3 className="text-lg font-bold text-white">Languages</h3>
                </div>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    Bengali (Native)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    English
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    Hindi
                  </li>
                </ul>
              </div>
            </SlideUpAnimation>

            <SlideUpAnimation>
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/60 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={20} className="text-lime-400" />
                  <h3 className="text-lg font-bold text-white">Location</h3>
                </div>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    Kotulpur, West Bengal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    Currently: Jalpaiguri
                  </li>
                </ul>
              </div>
            </SlideUpAnimation>

            <SlideUpAnimation>
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/60 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Code size={20} className="text-lime-400" />
                  <h3 className="text-lg font-bold text-white">Coding</h3>
                </div>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    LeetCode
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    GeeksforGeeks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime-400" />
                    Codeforces
                  </li>
                </ul>
              </div>
            </SlideUpAnimation>
          </div>

          {/* Education Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap size={24} className="text-lime-400" />
              Education Journey
            </h2>
            <Timeline
              data={educationData}
              icon={GraduationCap}
              subtitleKey="institution"
              linkLabel="View Result"
              linkKey="resultUrl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
