import React from 'react'
import { Tag, SectionLabel, ArrowBtn, Reveal } from '../../../Components/ui'

const EXPERIENCE = [
  { role: 'Fullstack Developer Intern', company: 'Quantumhash Corporation', period: '2026 – Present', current: true },
]

const EDUCATION = [
  { degree: 'B.Tech in IT', school: 'JGEC', year: '2023–Present' },
  { degree: 'Higher Secondary', school: 'Kotulpur High School', year: '2020–2022' },
  { degree: 'Secondary', school: 'Balitha High School', year: '2014–2020' },
]

const SKILLS = ['React', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'TypeScript', 'Tailwind', 'MySQL']

export default function About() {
  return (
    <section id="about" className="bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — bio */}
          <div>
            <Reveal dir="left"><SectionLabel>About Me</SectionLabel></Reveal>

            <Reveal dir="left" delay={0.1}>
              <h2 className="font-black text-white tracking-tighter leading-none mb-8"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                Passionate<br />
                <span style={{ WebkitTextStroke: '2px #a3e635', color: 'transparent' }}>Developer</span><br />
                &amp; Builder
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border-l-2 border-lime-400/40 pl-5 mb-8">
                <p className="text-zinc-300 text-lg leading-relaxed font-light">
                  "I believe great software is the intersection of clean engineering and thoughtful design."
                </p>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                I'm Subhas Mondal — a Fullstack Developer specialising in the MERN stack. I build production-grade web applications with clean code, sharp interfaces, and a focus on real-world impact.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Currently interning at Quantumhash Corporation while pursuing B.Tech in IT at JGEC, Jalpaiguri.
              </p>
              <ArrowBtn>Download Resume</ArrowBtn>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.3}>
              <div className="mt-10">
                <div className="text-zinc-600 text-xs uppercase tracking-widest mb-4">Core Skills</div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s, i) => (
                    <Tag key={s} yellow={i < 4}>{s}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — bento */}
          <div className="space-y-4">

            {/* Photo + exp banner */}
            <Reveal dir="right" delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800" style={{ height: '280px' }}>
                <img src="/Image/My Picture3.jpg" alt="Subhas Mondal"
                  className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-4xl font-black text-white mb-1">1+</div>
                  <div className="text-lime-400 text-sm font-semibold">Months Professional Experience</div>
                  <div className="text-zinc-500 text-xs mt-1">Quantumhash Corporation · 2026</div>
                </div>
                <div className="absolute top-4 right-4 bg-lime-400 text-zinc-950 text-xs font-black px-3 py-1 rounded-full anim-pulseGlow">
                  Current Role
                </div>
              </div>
            </Reveal>

            {/* 2-col bento row */}
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.2} dir="right">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
                  <div className="text-3xl font-black text-white mb-1">20+</div>
                  <div className="text-zinc-500 text-xs uppercase tracking-widest">Projects Done</div>
                  <div className="mt-3 h-1 rounded-full bg-zinc-800">
                    <div className="h-1 rounded-full bg-lime-400" style={{ width: '80%' }} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.25} dir="right">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
                  <div className="text-3xl font-black text-white mb-1">∞</div>
                  <div className="text-zinc-500 text-xs uppercase tracking-widest">Lines of Code</div>
                  <div className="mt-3 h-1 rounded-full bg-zinc-800">
                    <div className="h-1 rounded-full bg-lime-400" style={{ width: '100%' }} />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Education */}
            <Reveal delay={0.3} dir="right">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
                <div className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Education</div>
                <div className="space-y-3">
                  {EDUCATION.map((e, i) => (
                    <div key={e.degree} className="flex items-center justify-between group">
                      <div>
                        <div className="text-white text-sm font-semibold group-hover:text-lime-400 transition-colors duration-200">{e.degree}</div>
                        <div className="text-zinc-600 text-xs">{e.school}</div>
                      </div>
                      <Tag>{e.year}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
