import React, { useEffect, useRef, useState } from 'react'
import { Tag, SectionLabel, ArrowBtn, Reveal } from '../../../Components/ui'

const EXPERIENCE = [
  { role: 'Fullstack Developer Intern', company: 'Quantumhash Corporation', period: '2026 – Present', current: true },
]

const EDUCATION = [
  { degree: 'B.Tech in IT',      school: 'JGEC',                 year: '2023–Present' },
  { degree: 'Higher Secondary',  school: 'Kotulpur High School',  year: '2020–2022'    },
  { degree: 'Secondary',         school: 'Balitha High School',   year: '2014–2020'    },
]

const SKILLS = ['React', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'TypeScript', 'Tailwind', 'MySQL']

const TRAITS = [
  { icon: '⚡', label: 'Fast Learner'     },
  { icon: '🎯', label: 'Detail Oriented'  },
  { icon: '🤝', label: 'Team Player'      },
  { icon: '🚀', label: 'Self Driven'      },
]

/* ── Animated counter ──────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = Math.ceil(to / 40)
        const timer = setInterval(() => {
          start += step
          if (start >= to) { setCount(to); clearInterval(timer) }
          else setCount(start)
        }, 30)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="relative bg-zinc-950 py-28 overflow-hidden">

      {/* ── Background texture ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#a3e635 1px, transparent 1px), linear-gradient(90deg, #a3e635 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        {/* Radial glow top-right */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)' }} />
        {/* Radial glow bottom-left */}
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <Reveal dir="up">
          <div className="flex items-center gap-4 mb-4">
            <SectionLabel>About Me</SectionLabel>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent max-w-xs" />
          </div>
        </Reveal>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-start">

          {/* ════ LEFT COLUMN ════ */}
          <div>

            {/* Headline */}
            <Reveal dir="left" delay={0.05}>
              <h2 className="font-black text-white tracking-tighter leading-[0.9] mb-10"
                style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
                Passionate<br />
                <span className="relative inline-block">
                  <span style={{ WebkitTextStroke: '2px #a3e635', color: 'transparent' }}>Developer</span>
                  {/* Underline accent */}
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-lime-400 to-transparent" />
                </span>
                <br />
                <span className="text-zinc-600">&amp; Builder.</span>
              </h2>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.1}>
              <div className="relative mb-8 pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-400 via-lime-400/40 to-transparent" />
                <p className="text-zinc-300 text-lg leading-relaxed font-light italic">
                  "I believe great software is the intersection of clean engineering and thoughtful design."
                </p>
              </div>
            </Reveal>

            {/* Bio paragraphs */}
            <Reveal delay={0.15}>
              <p className="text-zinc-500 text-sm leading-[1.8] mb-4">
                I'm <span className="text-zinc-300 font-semibold">Subhas Mondal</span> — a Fullstack Developer specialising in the MERN stack. I build production-grade web applications with clean code, sharp interfaces, and a focus on real-world impact.
              </p>
              <p className="text-zinc-500 text-sm leading-[1.8] mb-10">
                Currently interning at <span className="text-lime-400 font-semibold">Quantumhash Corporation</span> while pursuing B.Tech in IT at JGEC, Jalpaiguri.
              </p>
            </Reveal>

            {/* Trait pills */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-2 mb-10">
                {TRAITS.map((t) => (
                  <div key={t.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-lime-400/40 hover:bg-lime-400/5 transition-all duration-200 group">
                    <span className="text-sm">{t.icon}</span>
                    <span className="text-zinc-400 text-xs font-semibold group-hover:text-zinc-200 transition-colors duration-200">{t.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.25}>
  <a href="/Resume.pdf" download="Subhas_Mondal_Resume.pdf">
    <ArrowBtn className='hover:cursor-pointer'>Download Resume</ArrowBtn>
  </a>
</Reveal>

            {/* ── Skills grid ── */}
            <Reveal delay={0.3}>
              <div className="mt-14">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Core Skills</span>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s, i) => (
                    <Tag key={s} yellow={i < 4}>{s}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Experience timeline ── */}
            <Reveal delay={0.35}>
              <div className="mt-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Experience</span>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.role}
                      className="relative flex items-start gap-5 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-lime-400/30 hover:bg-zinc-900/60 transition-all duration-300 group">
                      {/* Timeline dot */}
                      <div className="shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.6)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <div className="text-white font-bold text-sm group-hover:text-lime-400 transition-colors duration-200">{exp.role}</div>
                            <div className="text-zinc-500 text-xs mt-0.5">{exp.company}</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-zinc-600 text-xs">{exp.period}</span>
                            {exp.current && (
                              <span className="bg-lime-400/15 text-lime-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-lime-400/20 uppercase tracking-wider">
                                Live
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════ RIGHT COLUMN — bento ════ */}
          <div className="space-y-4">

            {/* Photo card */}
            <Reveal dir="right" delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 group"
                style={{ height: '320px' }}>
                <img
                  src="/Image/My Picture3.jpg"
                  alt="Subhas Mondal"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 to-transparent" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white font-black text-xl mb-0.5">Subhas Mondal</div>
                      <div className="text-zinc-400 text-xs">Fullstack Developer · MERN Stack</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lime-400 font-black text-2xl leading-none">1+</div>
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider">Mo. Exp.</div>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-zinc-950/80 backdrop-blur-sm border border-lime-400/30 text-lime-400 text-[10px] font-black px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  AVAILABLE
                </div>
              </div>
            </Reveal>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.2} dir="right">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-lime-400/30 hover:bg-zinc-900/60 transition-all duration-300 group">
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-lime-400 transition-colors duration-300">
                    <Counter to={20} suffix="+" />
                  </div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Projects Done</div>
                  <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-lime-400 to-lime-300 w-4/5
                      origin-left transition-transform duration-1000" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25} dir="right">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-lime-400/30 hover:bg-zinc-900/60 transition-all duration-300 group">
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-lime-400 transition-colors duration-300">∞</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Lines of Code</div>
                  <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-lime-400 to-lime-300 w-full" />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Currently building card */}
            <Reveal delay={0.28} dir="right">
              <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 hover:bg-lime-400/8 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-lime-400 text-[10px] font-black uppercase tracking-widest">Currently Building</span>
                </div>
                <div className="text-white font-bold text-sm mb-1">Talk2Hire</div>
                <div className="text-zinc-500 text-xs leading-relaxed">
                  React · Tailwind · Framer Motion · Node.js backend
                </div>
              </div>
            </Reveal>

            {/* Education card */}
            <Reveal delay={0.3} dir="right">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Education</div>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>
                <div className="space-y-4">
                  {EDUCATION.map((e, i) => (
                    <div key={e.degree} className="flex items-start justify-between gap-3 group">
                      <div className="flex items-start gap-3">
                        {/* Step indicator */}
                        <div className="flex flex-col items-center mt-1 shrink-0">
                          <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-lime-400' : 'bg-zinc-700'}`} />
                          {i < EDUCATION.length - 1 && <div className="w-px h-6 bg-zinc-800 mt-1" />}
                        </div>
                        <div>
                          <div className="text-white text-sm font-semibold group-hover:text-lime-400 transition-colors duration-200 leading-tight">
                            {e.degree}
                          </div>
                          <div className="text-zinc-600 text-xs mt-0.5">{e.school}</div>
                        </div>
                      </div>
                      <Tag>{e.year}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Location card */}
            <Reveal delay={0.35} dir="right">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex items-center justify-between hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-lg">📍</div>
                  <div>
                    <div className="text-white text-sm font-semibold">West Bengal, India</div>
                    <div className="text-zinc-600 text-xs">Open to remote worldwide</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-zinc-500 text-xs">Online</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}