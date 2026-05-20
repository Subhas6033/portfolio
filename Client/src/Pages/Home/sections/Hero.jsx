import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { ArrowBtn, Tag } from '../../../Components/ui'
import useInView from '../../../hooks/useInView'
import useCounter from '../../../hooks/useCounter'

const WORDS = ['Fullstack Developer', 'MERN Stack Developer', 'Problem Solver', 'Builder']

function StatsRow() {
  const [ref, inView] = useInView()
  const projects = useCounter(20, inView)
  const months = useCounter(3, inView)

  return (
    <div ref={ref} className="flex items-center gap-10">
      {[
        { val: projects, suffix: '+', label: 'Projects Shipped' },
        { val: months,   suffix: '+', label: 'Months Experience' },
        { val: '∞',      suffix: '',  label: 'Lines of Code',    static: true },
      ].map(s => (
        <div key={s.label}>
          <div className="text-3xl font-black text-white tabular-nums tracking-tight">
            {s.static ? s.val : s.val}{s.suffix}
          </div>
          <div className="text-zinc-600 text-xs mt-0.5 uppercase tracking-widest">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState('typing')
  const wRef = useRef(0)
  const navigate = useNavigate()
  useEffect(() => {
    const word = WORDS[wRef.current]
    if (phase === 'typing') {
      if (typed.length < word.length) {
        const t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('wait'), 2000)
      return () => clearTimeout(t)
    }
    if (phase === 'wait') {
      const t = setTimeout(() => setPhase('deleting'), 400)
      return () => clearTimeout(t)
    }
    if (typed.length > 0) {
      const t = setTimeout(() => setTyped(typed.slice(0, -1)), 45)
      return () => clearTimeout(t)
    }
    wRef.current = (wRef.current + 1) % WORDS.length
    setPhase('typing')
  }, [typed, phase])

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden pt-20">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(163,230,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.03) 1px,transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-center">

          {/* LEFT */}
          <div>
            {/* Status badge */}
            <div className="anim-fadeUp d-0 inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              Available for hire
            </div>

            {/* Name */}
            <div className="anim-fadeUp d-1 mb-2">
              <h1 className="font-black uppercase leading-none tracking-tighter text-white"
                style={{ fontSize: 'clamp(64px, 10vw, 120px)' }}>
                Subhas
              </h1>
              <h1 className="font-black uppercase leading-none tracking-tighter"
                style={{ fontSize: 'clamp(64px, 10vw, 120px)', WebkitTextStroke: '2px #a3e635', color: 'transparent' }}>
                Mondal
              </h1>
            </div>

            {/* Divider */}
            <div className="anim-fadeUp d-2 flex items-center gap-4 my-6">
              <div className="h-px flex-1 bg-gradient-to-r from-lime-400/60 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-lime-400" />
            </div>

            {/* Typewriter role */}
            <div className="anim-fadeUp d-3 flex items-center gap-3 mb-8" style={{ height: '36px' }}>
              <span className="text-zinc-400 text-lg font-medium">/</span>
              <span className="text-white text-lg font-semibold tracking-wide">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-lime-400"
                style={{ animation: 'blink 1s step-end infinite' }} />
            </div>

            {/* Bio */}
            <div className="anim-fadeUp d-4">
              <p className="text-zinc-500 text-base leading-relaxed max-w-lg mb-10">
                Building fast, scalable web applications with the MERN stack. Clean code, sharp UIs, and a passion for great developer experience.
              </p>
            </div>

            {/* CTAs */}
            <div className="anim-fadeUp d-5 flex items-center gap-4 mb-12">
              <ArrowBtn onClick={() => window.open("https://drive.google.com/file/d/1Du7IFCujKnLB4m3vwFuowdjJYCsFQIgg/view?usp=sharing")}>See my CV</ArrowBtn>
              <ArrowBtn outline onClick={() => navigate("/projects")}>View My Work</ArrowBtn>
            </div>

            {/* Stats */}
            <div className="anim-fadeUp d-6 pt-8 border-t border-zinc-800/60">
              <StatsRow />
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="anim-fadeRight d-3 relative hidden lg:flex justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: '0 0 60px rgba(163,230,53,0.15), inset 0 0 60px rgba(163,230,53,0.03)' }} />

              {/* Frame lines */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-lime-400 rounded-tl-xl" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-lime-400 rounded-br-xl" />

              <div className="w-72 aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-700/60 relative bg-zinc-900">
                <img src="/Image/My Picture3.jpg" alt="Subhas Mondal"
                  className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                {/* Name card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-700/50 rounded-xl p-3">
                    <div className="text-white font-bold text-sm">Subhas Mondal</div>
                    <div className="text-zinc-500 text-xs">Fullstack Developer · MERN</div>
                  </div>
                </div>
              </div>

              {/* Available badge */}
              <div className="absolute -top-3 -right-3 bg-lime-400 text-zinc-950 text-xs font-black px-3 py-1.5 rounded-full anim-pulseGlow flex items-center gap-1.5">
                Available <Check size={12} />
              </div>

              {/* Spinning ring */}
              <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full border border-dashed border-lime-400/30 anim-spin" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fadeUp d-8">
          <span className="text-zinc-700 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-700 to-transparent" />
        </div>
      </div>
    </section>
  )
}
