import React, { useState } from 'react'
import { Stars, SectionLabel, Reveal } from '../../../Components/ui'

const TESTIMONIALS = [
  {
    quote: "Subhas transformed our entire visual identity. The attention to detail and speed of delivery was remarkable — we couldn't be happier.",
    name: 'Sarah Johnson',
    role: 'CEO, TechStartup',
    initials: 'SJ',
    color: 'from-blue-600 to-blue-400',
  },
  {
    quote: "Working with Subhas is a completely different level of quality. He asks the right questions and delivers work that actually converts.",
    name: 'Marcus Webb',
    role: 'Founder, CreativeAgency',
    initials: 'MW',
    color: 'from-emerald-600 to-emerald-400',
  },
  {
    quote: "From concept to production, Subhas handled everything with professionalism and sharp instincts. Highly recommended.",
    name: 'Priya Sharma',
    role: 'PM, FinTech Co.',
    initials: 'PS',
    color: 'from-violet-600 to-violet-400',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="bg-zinc-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <Reveal dir="left">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
              Client<br/><span className="shimmer-text">Feedback</span>
            </h2>
          </Reveal>
          {/* Big decorative quote */}
          <div className="text-zinc-900 font-black select-none hidden lg:block"
            style={{ fontSize: '120px', lineHeight: 1, color: 'rgba(163,230,53,0.06)' }}>
            "
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} dir="scale">
              <div
                className={`relative p-6 rounded-2xl border transition-all duration-400 cursor-pointer overflow-hidden ${
                  active === i
                    ? 'bg-zinc-900 border-lime-400/30 shadow-[0_0_50px_rgba(163,230,53,0.08)]'
                    : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setActive(i)}
              >
                {/* Active indicator */}
                {active === i && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400 to-lime-400/0" />
                )}

                <Stars />
                <p className="text-zinc-300 text-sm leading-relaxed my-5">"{t.quote}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-black shrink-0 ${active === i ? 'shadow-[0_0_20px_rgba(163,230,53,0.3)]' : ''}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">{t.name}</div>
                    <div className="text-zinc-600 text-xs">{t.role}</div>
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
