import { Check, MoveUpRight } from 'lucide-react'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {Link, useNavigate} from 'react-router-dom'

// Global CSS
const KEYFRAMES = `
  @keyframes ticker        { from{transform:translateX(0)}      to{transform:translateX(-50%)} }
  @keyframes fadeUp        { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeLeft      { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRight     { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn       { from{opacity:0;transform:scale(0.88)}       to{opacity:1;transform:scale(1)} }
  @keyframes shimmer       { from{background-position:-200% 0}           to{background-position:200% 0} }
  @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes spin          { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes floatY        { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes pulseGlow     { 0%,100%{box-shadow:0 0 0 0 rgba(163,230,53,0.4)} 50%{box-shadow:0 0 0 16px rgba(163,230,53,0)} }
  @keyframes gradPan       { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes borderTrace   { 0%{stroke-dashoffset:1000} 100%{stroke-dashoffset:0} }
  @keyframes countUp       { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cursorPulse   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0.7} }
  @keyframes ripple        { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(4);opacity:0} }
  @keyframes slideReveal   { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
  @keyframes wobble        { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(1deg)} }

  .anim-fadeUp   { animation: fadeUp   0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fadeLeft { animation: fadeLeft 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fadeRight{ animation: fadeRight 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-scaleIn  { animation: scaleIn  0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-floatY   { animation: floatY   5s ease-in-out infinite; }
  .anim-spin     { animation: spin    20s linear infinite; }
  .anim-wobble   { animation: wobble   3s ease-in-out infinite; }
  .anim-pulseGlow{ animation: pulseGlow 2.5s ease-in-out infinite; }

  .d-0  { animation-delay: 0s; }
  .d-1  { animation-delay: 0.1s; }
  .d-2  { animation-delay: 0.2s; }
  .d-3  { animation-delay: 0.3s; }
  .d-4  { animation-delay: 0.4s; }
  .d-5  { animation-delay: 0.5s; }
  .d-6  { animation-delay: 0.6s; }
  .d-7  { animation-delay: 0.7s; }
  .d-8  { animation-delay: 0.8s; }

  .shimmer-text {
    background: linear-gradient(90deg, #a3e635 0%, #fff 40%, #a3e635 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s; }
  .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }

  .btn-ripple { position:relative; overflow:hidden; }
  .btn-ripple::after {
    content:''; position:absolute; border-radius:50%;
    width:100%; padding-top:100%; top:50%; left:50%;
    transform:translate(-50%,-50%) scale(0);
    background: rgba(255,255,255,0.2);
    transition: transform 0.5s, opacity 0.5s;
    opacity:0;
  }
  .btn-ripple:active::after { transform:translate(-50%,-50%) scale(2); opacity:1; transition:0s; }

  .card-shine {
    position:relative; overflow:hidden;
  }
  .card-shine::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(105deg, transparent 40%, rgba(163,230,53,0.06) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.6s;
    z-index:1;
  }
  .card-shine:hover::before { transform: translateX(100%); }

  .underline-anim { position:relative; display:inline-block; }
  .underline-anim::after {
    content:''; position:absolute; left:0; bottom:-2px;
    width:0; height:2px; background:#a3e635;
    transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .underline-anim:hover::after { width:100%; }
`

/** Scroll-triggered visibility */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/** Animated counter */
function useCounter(target, inView, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return val
}


const Tag = ({ children, yellow }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-200 hover:scale-105 ${
    yellow ? 'bg-lime-400/10 border-lime-400/30 text-lime-400 hover:bg-lime-400/20'
           : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
  }`}>{children}</span>
)

const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#a3e635"
        style={{ animation: `wobble ${1 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}>
        <path d="M6 1l1.34 2.72L10.5 4.2l-2.25 2.2.53 3.1L6 8.02 3.22 9.5l.53-3.1L1.5 4.2l3.16-.48z"/>
      </svg>
    ))}
  </div>
)

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
      style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}>
      <div className="w-2 h-2 bg-lime-400 rounded-sm"/>
    </div>
    <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">{children}</span>
  </div>
)

const ArrowBtn = ({ children, outline, className = '' }) => (
  <button data-hover className={`btn-ripple inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 group ${
    outline
      ? 'border border-zinc-700 text-zinc-300 hover:border-lime-400 hover:text-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)]'
      : 'bg-lime-400 text-zinc-950 hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] active:scale-95'
  } ${className}`}>
    {children}
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
)

/* Animated section wrapper — fades up when scrolled into view */
function Reveal({ children, className = '', delay = 0, dir = 'up' }) {
  const [ref, inView] = useInView()
  const cls = dir === 'left' ? 'anim-fadeLeft' : dir === 'right' ? 'anim-fadeRight' : dir === 'scale' ? 'anim-scaleIn' : 'anim-fadeUp'
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? undefined : 0 }}>
      {inView && (
        <div className={cls} style={{ animationDelay: `${delay}s` }}>
          {children}
        </div>
      )}
    </div>
  )
}

// Hero Components
function Hero() {
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState('typing')
  const words = ['Fullstack Developer', 'MERN Stack Developer', 'Problem Solver', 'BUILDER']
  const wRef = useRef(0)

  useEffect(() => {
    const word = words[wRef.current]
    if (phase === 'typing') {
      if (typed.length < word.length) {
        const t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 90)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('wait'), 1800)
        return () => clearTimeout(t)
      }
    } else if (phase === 'wait') {
      const t = setTimeout(() => setPhase('deleting'), 500)
      return () => clearTimeout(t)
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 55)
        return () => clearTimeout(t)
      } else {
        wRef.current = (wRef.current + 1) % words.length
        setPhase('typing')
      }
    }
  }, [typed, phase])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950 pt-20">
      {/* Animated grid bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'60px 60px' }}/>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(163,230,53,0.12) 0%,transparent 70%)', animation:'floatY 6s ease-in-out infinite', filter:'blur(40px)' }}/>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(163,230,53,0.06) 0%,transparent 70%)', animation:'floatY 8s ease-in-out infinite 2s', filter:'blur(60px)' }}/>

      <div className="max-w-7xl mx-auto px-6 w-full py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="anim-fadeUp d-0 flex flex-wrap gap-2 mb-8">
              {['React', 'Node.js', 'MongoDB', 'Next.js'].map((s, i) => (
                <div key={s} style={{ animationDelay: `${i * 0.08}s` }}>
                  <Tag>{s}</Tag>
                </div>
              ))}
            </div>

            <div className="anim-fadeUp d-2">
              <h1 className="text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-white mb-2">
                Subhas
              </h1>

              {/* ── Fixed-height row so layout never shifts ── */}
<div
  className="flex items-center gap-3 mb-6"
  style={{ height: '52px' }}
>
  <span
    className="font-black uppercase leading-none tracking-tighter whitespace-nowrap"
    style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#a3e635' }}
  >
    {typed}
  </span>
  <span className='inline-block w-1 h-11 bg-[#a3e635] border-2 shrink-0 ' style={{
    animation: 'blink 1s step-end infinite'
  }}/>
</div>
            </div>

            <div className="anim-fadeUp d-3">
              <p className="text-zinc-400 text-base leading-relaxed max-w-md mb-8">
                Hey, I'm Subhas Mondal — a Fullstack Developer specialising in the MERN stack. I build fast, scalable web applications with clean code and sharp UIs.
              </p>
            </div>

            <StatsRow />

            <div className="anim-fadeUp d-6 mt-6">
              <ArrowBtn>Start a Project Now</ArrowBtn>
            </div>
          </div>

          {/* Right — photo card */}
          <div className="anim-fadeRight d-3 relative flex justify-center lg:justify-end">
            <div className="relative w-72 lg:w-80">
              <div
                className="w-full aspect-[3/4] rounded-2xl bg-zinc-800 overflow-hidden relative border border-zinc-700 hover-lift card-shine"
                style={{ boxShadow: '0 0 40px rgba(163,230,53,0.08)' }}
              >
                <img
                  src="/Image/My Picture3.jpg"
                  alt="Subhas Mondal"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-sm rounded-xl p-3 border border-zinc-700">
                  <div className="text-white font-bold text-sm">Subhas Mondal</div>
                  <div className="text-zinc-500 text-xs">Fullstack Developer</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-lime-400 text-zinc-950 text-xs font-black px-3 py-1.5 rounded-full shadow-xl anim-wobble anim-pulseGlow">
                <span className='flex justify-center items-center gap-2'>
                  Available <Check className='h-4 w-4'/>
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-2 border-lime-400/20 anim-spin"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsRow() {
  const [ref, inView] = useInView()
  const c2 = useCounter(20, inView)
  const c3 = useCounter(1.5,  inView)

  return (
    <div ref={ref} className="anim-fadeUp d-4 flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-zinc-800">
      {[
        { val: c2, suffix:'+', label:'Projects Done' },
        { val: c3, suffix:'+', label:'Months Exp.' },
      ].map((s, i) => (
        <div key={s.label} style={{ animationDelay:`${i*0.1}s` }}>
          <div className="text-2xl font-black text-white tabular-nums">
            {s.val}{s.suffix}
          </div>
          <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// Projects
function Projects() {
  const navigate = useNavigate()
  const projects = [
    { 
      title: 'Talk2Hire | AI powered Hiring and interview platform', 
      category: 'Fullstack', 
      tags: ['Fullstack'], 
      accent: 'from-zinc-900 to-zinc-800',
      image: '/Projects/Talk2Hire.png',
      route: '/projects/talk2hire'
    },
    { 
      title: 'Carrier and Development Cell', 
      category: ['Fullstack', "College"], 
      date: '03 Sep 2024', 
      tags: ['MERN', 'College'], 
      accent: 'from-zinc-800 to-zinc-900',
      image: '/Projects/CDC.png',
      route: '/projects/carrieranddevelopmentcelljgec'
    },
    { 
      title: 'Electrical Vehicle Dashboard', 
      category: 'Web Development', 
      date: '20 Oct 2024', 
      tags: ['React.JS', 'Tailwind'], 
      accent: 'from-zinc-800 to-zinc-950',
      image: '/Projects/EV.png',
      route: '/projects/ev-dashboard'
    },
    /* { 
      title: 'Mobile App MVP', 
      category: 'Product Design', 
      date: '15 Nov 2024', 
      tags: ['Mobile', 'Figma'], 
      accent: 'from-zinc-900 to-zinc-800',
      image: '/images/project4.jpg',
      route: '/projects/mobile-app'
    }, */
  ]

  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <Reveal dir="left">
            <SectionLabel>Recent Projects</SectionLabel>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Latest <span className="shimmer-text">Work</span>
            </h2>
          </Reveal>
          <Reveal dir="right">
            <span onClick={() => navigate("/projects")}>
              <ArrowBtn outline>Explore More</ArrowBtn>
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* ── Featured card ── */}
          <Reveal delay={0} dir="scale">
            <Link
              to={projects[0].route}
              className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 hover:border-lime-400/40 transition-all duration-500 card-shine hover-lift block"
            >
              {/* Image fills top, fixed height */}
              <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ height: '320px' }}>
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-lime-400/0 group-hover:bg-lime-400/5 transition-all duration-500"/>
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-sm text-lime-400 text-xs font-bold px-2.5 py-1 rounded-full border border-lime-400/20">
                  {projects[0].category}
                </div>
              </div>

              {/* Card footer */}
              <div className="p-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {projects[0].tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                <h3 className="text-white font-bold text-xl mb-1 group-hover:text-lime-400 transition-colors duration-300">
                  {projects[0].title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-zinc-500 text-xs">{projects[0].date}</span>
                  <div className="w-8 h-8 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 text-sm group-hover:bg-lime-400 group-hover:text-zinc-950 transition-all duration-300 group-hover:rotate-45">
                    <MoveUpRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* ── Small cards ── */}
          <div className="flex flex-col gap-6">
            {projects.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12} dir="right">
                <Link
                  to={p.route}
                  className={`group relative rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-br ${p.accent} hover:border-lime-400/40 transition-all duration-500 card-shine hover-lift block`}
                >
                  <div className="p-5 flex items-center gap-4">

                    {/* Thumbnail */}
                    <div className="w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden border border-zinc-700 group-hover:border-lime-400/30 transition-colors duration-300 relative bg-zinc-950">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-300"/>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
                      </div>
                      <h3 className="text-white font-bold text-base leading-tight mb-1 truncate group-hover:text-lime-400 transition-colors duration-300">
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-xs">{p.date}</span>
                        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 text-xs group-hover:bg-lime-400 group-hover:text-zinc-950 group-hover:border-lime-400 transition-all duration-300 group-hover:rotate-45">
                          <MoveUpRight />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   03 — ABOUT
═══════════════════════════════════════════════════ */
function About() {
  const experience = [
    { role:'UI/UX Designer', company:'Fiverr', period:'2022 – Present', current:true },
    { role:'Product Designer', company:'Upwork', period:'2020 – 2022', current:false },
    { role:'Senior UX Designer', company:'In-agency', period:'2018 – 2020', current:false },
  ]
  const education = [
    { degree:'BSc in CSE', school:'State University', year:'2017' },
    { degree:'Diploma in Web Design', school:'Design School', year:'2016' },
    { degree:'UI/UX Certificate', school:'Google', year:'2019' },
    { degree:'Branding Course', school:'Skillshare', year:'2021' },
  ]

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal dir="left"><SectionLabel>About Me</SectionLabel></Reveal>
            <Reveal dir="left" delay={0.1}>
              <h2 className="text-4xl font-black text-white tracking-tight mb-4">
                Passionate &amp; Lead<br/>
                <span className="text-lime-400">Product Designer</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">I'm passionate about building things — from digital products and brand systems to interactive experiences. Every project is a chance to craft something meaningful.</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">With 5+ years shipping production-grade design systems and marketing sites, I bring both creative vision and technical depth to every engagement.</p>
              <ArrowBtn>Download Resume</ArrowBtn>
            </Reveal>

            <div className="mt-12">
              <Reveal dir="left"><SectionLabel>Experience</SectionLabel></Reveal>
              <div className="space-y-4 mt-2">
                {experience.map((e, i) => (
                  <Reveal key={e.role} delay={i * 0.1}>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-lime-400/40 hover:bg-zinc-800/80 transition-all duration-300 group">
                      <div>
                        <div className="text-white text-sm font-bold group-hover:text-lime-400 transition-colors duration-200">{e.role}</div>
                        <div className="text-zinc-500 text-xs mt-0.5">{e.company} · {e.period}</div>
                      </div>
                      {e.current && <Tag yellow>Current</Tag>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Reveal dir="left"><SectionLabel>Education</SectionLabel></Reveal>
              <div className="space-y-3 mt-2">
                {education.map((e, i) => (
                  <Reveal key={e.degree} delay={i * 0.08}>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70 transition-all duration-300 group cursor-default">
                      <div>
                        <div className="text-white text-sm font-semibold group-hover:text-lime-400 transition-colors duration-200">{e.degree}</div>
                        <div className="text-zinc-500 text-xs">{e.school}</div>
                      </div>
                      <Tag>{e.year}</Tag>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8">
            <Reveal dir="right" delay={0.1}>
              <div className="rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 aspect-[4/3] flex items-end justify-center relative hover-lift card-shine"
                style={{ boxShadow:'0 0 40px rgba(163,230,53,0.06)' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/20 to-zinc-950/80"/>
                <div className="absolute top-6 right-6 bg-lime-400 text-zinc-950 text-xs font-black px-3 py-1 rounded-full anim-pulseGlow">5+ Years Exp.</div>
                <div className="relative z-10 text-center pb-6">
                  <div className="text-white font-bold text-lg">Subhas Michel</div>
                  <div className="text-zinc-400 text-xs">Product Design Expert</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-zinc-800 border border-zinc-700 p-6 space-y-4 hover:border-zinc-600 transition-colors duration-300">
                <h4 className="text-white font-bold text-base mb-4">Contact Info</h4>
                {[
                  { label:'Phone',   val:'+123 4564 9999' },
                  { label:'Email',   val:'luminity@gmail.com' },
                  { label:'Website', val:'www.luminity.com' },
                  { label:'Address', val:'13 Southern Way, LA' },
                ].map((c, i) => (
                  <div key={c.label}
                    className="flex items-center gap-3 py-2 border-b border-zinc-700 last:border-0 group cursor-default"
                    style={{ animationDelay:`${i*0.1}s` }}>
                    <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center text-lime-400 text-xs font-bold flex-shrink-0 group-hover:bg-lime-400 group-hover:text-zinc-950 transition-all duration-200">
                      {c.label[0]}
                    </div>
                    <div>
                      <div className="text-zinc-500 text-xs">{c.label}</div>
                      <div className="text-white text-sm font-medium group-hover:text-lime-400 transition-colors duration-200">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   04 — TOOLS TICKER
═══════════════════════════════════════════════════ */
function ToolsTicker() {
  const row1 = ['C', 'C++', 'Java', 'JavaScript', 'Python', 'TypeScript', 'HTML5', 'CSS3',
                'C', 'C++', 'Java', 'JavaScript', 'Python', 'TypeScript', 'HTML5', 'CSS3']
  const row2 = ['ReactJS', 'Next.js', 'Node.js', 'MongoDB', 'MySQL', 'Figma', 'Tailwind CSS', 'Express',
                'ReactJS', 'Next.js', 'Node.js', 'MongoDB', 'MySQL', 'Figma', 'Tailwind CSS', 'Express']

  const items = {
    'C':           { icon: '𝗖',  color: 'from-blue-600/20 to-blue-500/5',    border: 'border-blue-600/40',    text: 'text-blue-400'    },
    'C++':         { icon: '𝗖⁺', color: 'from-blue-500/20 to-blue-400/5',    border: 'border-blue-500/40',    text: 'text-blue-300'    },
    'Java':        { icon: '☕',  color: 'from-orange-600/20 to-orange-500/5', border: 'border-orange-600/40',  text: 'text-orange-400'  },
    'JavaScript':  { icon: 'JS', color: 'from-yellow-400/20 to-yellow-300/5', border: 'border-yellow-400/40',  text: 'text-yellow-300'  },
    'Python':      { icon: '🐍',  color: 'from-sky-500/20 to-sky-400/5',      border: 'border-sky-500/40',     text: 'text-sky-400'     },
    'TypeScript':  { icon: 'TS', color: 'from-blue-500/20 to-blue-400/5',    border: 'border-blue-500/40',    text: 'text-blue-400'    },
    'HTML5':       { icon: '🌐',  color: 'from-orange-500/20 to-orange-400/5', border: 'border-orange-500/40',  text: 'text-orange-400'  },
    'CSS3':        { icon: '🎨',  color: 'from-indigo-500/20 to-indigo-400/5', border: 'border-indigo-500/40',  text: 'text-indigo-400'  },
    'ReactJS':     { icon: '⚛️',  color: 'from-cyan-500/20 to-cyan-400/5',    border: 'border-cyan-500/40',    text: 'text-cyan-400'    },
    'Next.js':     { icon: '▲',  color: 'from-white/10 to-white/5',           border: 'border-white/20',       text: 'text-white'       },
    'Node.js':     { icon: '🟢',  color: 'from-green-500/20 to-green-400/5',  border: 'border-green-500/40',   text: 'text-green-400'   },
    'MongoDB':     { icon: '🍃',  color: 'from-emerald-500/20 to-emerald-400/5', border: 'border-emerald-500/40', text: 'text-emerald-400' },
    'MySQL':       { icon: '🐬',  color: 'from-teal-500/20 to-teal-400/5',    border: 'border-teal-500/40',    text: 'text-teal-400'    },
    'Figma':       { icon: '🎯',  color: 'from-purple-500/20 to-purple-400/5', border: 'border-purple-500/40',  text: 'text-purple-400'  },
    'Tailwind CSS':{ icon: '💨',  color: 'from-sky-500/20 to-sky-400/5',      border: 'border-sky-500/40',     text: 'text-sky-400'     },
    'Express':     { icon: '🚂',  color: 'from-zinc-500/20 to-zinc-400/5',    border: 'border-zinc-500/40',    text: 'text-zinc-300'    },
  }

  const TickerItem = ({ t }) => {
    const s = items[t] || { icon: '•', color: 'from-zinc-500/20 to-zinc-400/5', border: 'border-zinc-500/40', text: 'text-zinc-400' }
    return (
      <span className="flex items-center gap-2.5 whitespace-nowrap group cursor-default">
        <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.color} border ${s.border} flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
          {s.icon}
        </span>
        <span className={`${s.text} font-bold text-xs uppercase tracking-widest transition-all duration-300 group-hover:brightness-125`}>
          {t}
        </span>
      </span>
    )
  }

  return (
    <div className="overflow-hidden py-6 relative"
      style={{ background: 'linear-gradient(180deg, #09090b 0%, #111118 50%, #09090b 100%)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #09090b 30%, transparent)' }}/>
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #09090b 30%, transparent)' }}/>

      {/* Row 1 — languages */}
      <div className="flex gap-8 w-max mb-4" style={{ animation: 'ticker 35s linear infinite' }}>
        {row1.map((t, i) => <TickerItem key={i} t={t} />)}
      </div>

      {/* Row 2 — frameworks & tools */}
      <div className="flex gap-8 w-max" style={{ animation: 'ticker 28s linear infinite reverse' }}>
        {row2.map((t, i) => <TickerItem key={i} t={t} />)}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   05 — SERVICES
═══════════════════════════════════════════════════ */
function Services() {
  const [open, setOpen] = useState(0)
  const services = [
    { num:'01', title:'UI/UX Design',      desc:'Designing intuitive and engaging user interfaces that combine beautiful aesthetics with seamless usability.', tags:['Wireframing','Prototyping'] },
    { num:'02', title:'Web Development',   desc:'Building performant, accessible websites and web apps using modern tech like React, Next.js, and Tailwind.',   tags:['React','Next.js'] },
    { num:'03', title:'Branding',          desc:'Creating your visual identity — from logo design to comprehensive brand guidelines and asset systems.',         tags:['Logo Design','Brand System'] },
    { num:'04', title:'Animation Design',  desc:'Bringing interfaces to life with purposeful micro-interactions, page transitions, and motion systems.',          tags:['Framer Motion','GSAP'] },
    { num:'05', title:'Product Design',    desc:'End-to-end product thinking from discovery, to design system creation, through production handoff.',            tags:['Discovery','Design Systems'] },
  ]

  return (
    <section className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal dir="left">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>My Services</SectionLabel>
              <ArrowBtn className="mb-10">Start a Project Now</ArrowBtn>
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/30 transition-colors duration-500 hover-lift card-shine">
                <h3 className="text-white text-2xl font-black mb-3">
                  Experience the Impact of{' '}
                  <span className="text-lime-400">User-Centered Design</span>
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Elevate your brand with our expert design team. From wireframes to production, we deliver results that matter.</p>
                <div className="mt-6 rounded-xl bg-zinc-800 border border-zinc-700 aspect-video flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {['bg-red-400','bg-yellow-400','bg-green-400'].map(c => (
                      <div key={c} className={`w-2 h-2 rounded-full ${c} hover:scale-125 transition-transform cursor-pointer`}/>
                    ))}
                  </div>
                  <div className="text-zinc-600 text-xs group-hover:text-zinc-500 transition-colors">App Preview</div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-zinc-950 text-sm font-black hover:scale-110 transition-transform cursor-pointer">↗</div>
                  {/* shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border transition-all duration-400 overflow-hidden cursor-pointer ${
                    open === i ? 'bg-zinc-900 border-lime-400/40 shadow-[0_0_30px_rgba(163,230,53,0.08)]'
                               : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-black font-mono transition-colors ${open===i?'text-lime-400':'text-zinc-600'}`}>{s.num}</span>
                      <span className={`font-bold text-base transition-colors duration-200 ${open===i?'text-lime-400':'text-zinc-300 group-hover:text-white'}`}>{s.title}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
                      open===i ? 'bg-lime-400 border-lime-400 text-zinc-950 rotate-45' : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}>
                      +
                    </div>
                  </div>
                  <div style={{
                    maxHeight: open===i ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    <div className="px-5 pb-5">
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                      <div className="flex gap-2 flex-wrap">
                        {s.tags.map(t => <Tag key={t} yellow>{t}</Tag>)}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   06 — FEATURED WORK
═══════════════════════════════════════════════════ */
function FeaturedWork() {
  const works = [
    { title:'Website Redesign',       cat:'UI/UX Design',    size:'large' },
    { title:'Branding Identity Design',cat:'Branding',       size:'large' },
    { title:'Creative Hub Website',   cat:'Web Dev',         size:'small' },
    { title:'Mobile App MVP',         cat:'Product Design',  size:'small' },
  ]

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <Reveal dir="left">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Showcasing My Work for<br/>
              <span className="shimmer-text">Your Inspiration</span>
            </h2>
          </Reveal>
          <Reveal dir="right" delay={0.1}>
            <div className="lg:flex lg:items-end lg:justify-end lg:h-full">
              <div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-sm">Take a look at my portfolio of work. Each project reflects my commitment to quality, clarity, and craft.</p>
                <ArrowBtn outline>Explore all Projects</ArrowBtn>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1} dir="scale">
              <div className={`group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-lime-400/40 transition-all duration-500 hover-lift card-shine cursor-pointer ${w.size==='large'?'aspect-[4/3]':'aspect-[16/9]'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950"/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-700 border border-zinc-600 opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"/>
                </div>
                {/* Hover reveal overlay */}
                <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center text-zinc-950 text-2xl font-black scale-0 group-hover:scale-100 transition-transform duration-400 delay-100 shadow-[0_0_40px_rgba(163,230,53,0.6)]">
                    ↗
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-zinc-950 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-zinc-400 text-xs mb-1">{w.cat}</div>
                  <div className="text-white font-bold text-base group-hover:text-lime-400 transition-colors duration-300">{w.title}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   07 — TESTIMONIALS
═══════════════════════════════════════════════════ */
function Testimonials() {
  const [active, setActive] = useState(0)
  const testimonials = [
    { quote:"Subhas transformed our entire visual identity. The attention to detail and the speed of delivery was remarkable — we couldn't be happier.", name:'Sarah Johnson', role:'CEO, TechStartup', initials:'SJ', color:'bg-blue-500' },
    { quote:"Working with Subhas is a completely different level of quality. He asks the right questions and delivers designs that actually convert.", name:'Marcus Webb', role:'Founder, CreativeAgency', initials:'MW', color:'bg-emerald-500' },
    { quote:"From concept to production, Subhas handled everything with professionalism and sharp creative instincts. Highly recommended.", name:'Priya Sharma', role:'PM, FinTech Co.', initials:'PS', color:'bg-purple-500' },
  ]

  return (
    <section className="bg-zinc-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative mb-12">
          <div className="text-[120px] font-black text-zinc-900 leading-none select-none uppercase tracking-tighter absolute top-0 left-0 pointer-events-none hidden lg:block"
            style={{ animation:'gradPan 8s ease infinite', backgroundImage:'linear-gradient(90deg,#18181b,#27272a,#18181b)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            TESTIMONIALS
          </div>
          <div className="relative z-10 pt-8">
            <Reveal dir="left"><SectionLabel>Testimonials</SectionLabel></Reveal>
            <Reveal dir="left" delay={0.1}>
              <h2 className="text-4xl font-black text-white tracking-tight">
                Trusted 8,200+ <span className="shimmer-text">Satisfied Clients</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.12} dir="scale">
              <div
                data-hover
                className={`p-6 rounded-2xl border transition-all duration-400 cursor-pointer hover-lift card-shine ${
                  active===i ? 'bg-zinc-900 border-lime-400/40 shadow-[0_0_40px_rgba(163,230,53,0.1)]'
                              : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setActive(i)}
              >
                <Stars />
                <p className="text-zinc-300 text-sm leading-relaxed my-4">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${active===i?'anim-pulseGlow':''}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">{t.name}</div>
                    <div className="text-zinc-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   08 — FAQ
═══════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q:'What services do you offer?',       a:'I offer UI/UX design, web development, branding, motion design, and end-to-end product design for startups and established companies.' },
    { q:'How fast will I receive my work?',   a:'Project timelines vary by scope. Most design projects take 1–3 weeks; development projects range from 2–8 weeks.' },
    { q:"What's your design process?",        a:'I start with discovery and research, move into wireframing and prototyping, then iterate based on feedback before final delivery.' },
    { q:'What if I have a single project?',   a:'No problem — I work on one-off projects as well as ongoing retainer arrangements.' },
    { q:'Do you offer ongoing support?',      a:'Yes! I offer monthly retainer packages for ongoing design support, updates, and iteration.' },
    { q:'Are there any hidden costs?',        a:'Never. All pricing is agreed upfront. Any scope changes are discussed and approved before additional work begins.' },
  ]

  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <Reveal dir="left">
            <SectionLabel>Support</SectionLabel>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Expert<br/><span className="text-lime-400">FAQs</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed mt-4">Have a different question? Reach out directly and I'll get back to you within 24 hours.</p>
          </Reveal>

          <div className="lg:col-span-2 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                    open===i ? 'bg-zinc-800 border-lime-400/30 shadow-[0_0_20px_rgba(163,230,53,0.06)]'
                              : 'bg-zinc-800/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70'
                  }`}
                  onClick={() => setOpen(open===i ? null : i)}
                >
                  <div className="flex items-center justify-between p-5">
                    <span className={`text-sm font-semibold transition-colors duration-200 ${open===i?'text-lime-400':'text-zinc-200'}`}>{f.q}</span>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all duration-300 flex-shrink-0 ml-4 ${open===i?'bg-lime-400 border-lime-400 text-zinc-950 rotate-45':'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}>
                      +
                    </div>
                  </div>
                  <div style={{ maxHeight:open===i?200:0, overflow:'hidden', transition:'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div className="px-5 pb-5">
                      <p className="text-zinc-400 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   09 — CTA BANNER
═══════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section className="bg-zinc-950 py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'60px 60px' }}/>

      {/* Animated glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(163,230,53,0.08) 0%,transparent 70%)', filter:'blur(60px)', animation:'floatY 7s ease-in-out infinite' }}/>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(163,230,53,0.06) 0%,transparent 70%)', filter:'blur(40px)', animation:'floatY 5s ease-in-out infinite 1s' }}/>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <Reveal><SectionLabel>Got a Project?</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-4">
            Surround yourself<br/>
            <span className="shimmer-text">with an expert</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-zinc-500 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            I take on select projects each quarter to ensure every client gets my full focus. Let's build something great together.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <ArrowBtn>Start a Project Now</ArrowBtn>
            <ArrowBtn outline>View Portfolio</ArrowBtn>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════════ */
const Home = () => {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="bg-zinc-950">
        <Hero />
        <ToolsTicker />
        <Projects />
        <About />
        <Services />
        <FeaturedWork />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </div>
    </>
  )
}

export default Home