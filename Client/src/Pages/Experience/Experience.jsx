import React from 'react'
import { GraduationCap,Briefcase } from 'lucide-react'
import Timeline from '../../Components/index'
import { KEYFRAMES } from '../../Components/ui/animations'

const experienceData = [
  {
    title: "Full Stack Developer Intern",
    company: "Quantumhash Corporation",
    period: "2026 - Present",
    location: "Remote",
    description: "Building scalable web applications using MERN stack. Working on real-time features, API integration, and performance optimization.",
    align: "left",
  },
  {
    title: "Frontend Developer",
    company: "Startup Inc",
    period: "2023 - 2024",
    location: "Remote",
    description: "Developed responsive user interfaces using React and Tailwind CSS. Collaborated with design team to implement pixel-perfect designs.",
    align: "right",
  },
  {
    title: "Web Developer Intern",
    company: "Digital Agency",
    period: "2022 - 2023",
    location: "India",
    description: "Learned modern web technologies and contributed to client projects. Gained hands-on experience with JavaScript, React, and Node.js.",
    align: "left",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="anim-fadeUp mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
                style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}>
                <div className="w-2 h-2 bg-lime-400 rounded-sm" />
              </div>
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">Journey</span>
            </div>
            <h1 className="font-black text-white tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              My <span className="shimmer-text">Experience</span>
            </h1>
            <p className="text-zinc-500 text-base max-w-lg leading-relaxed">
              A timeline of my professional journey and academic background.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="mb-20">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              Work Experience
            </h2>
            <Timeline
      data={experienceData}
      icon={Briefcase}
      subtitleKey="company"
    />
          </div>
        </div>
      </div>
    </>
  )
}