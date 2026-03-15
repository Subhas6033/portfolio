import React, { useState } from 'react'
import { MoveUpRight } from 'lucide-react'
import { Tag, SectionLabel, ArrowBtn, Reveal } from '../../../Components/ui'

const SERVICES = [
  {
    num: '01',
    title: 'Fullstack Development',
    desc: 'End-to-end web applications using the MERN stack — pixel-perfect UIs to robust server-side APIs with clean, scalable code.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    num: '02',
    title: 'Frontend Development',
    desc: 'Fast, responsive, visually sharp interfaces with smooth animations and seamless UX across all devices.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    num: '03',
    title: 'Backend Development',
    desc: 'Secure, high-performance REST APIs and server architecture that power your product reliably at any scale.',
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    num: '04',
    title: 'Database Design',
    desc: 'Efficient, well-normalised databases with optimised queries and data models that keep your app fast.',
    tags: ['MongoDB', 'MySQL', 'Schema Design'],
  },
  {
    num: '05',
    title: 'API Integration',
    desc: 'Connecting products with third-party services, payment gateways, and external APIs to extend functionality.',
    tags: ['REST', 'Webhooks', 'Third-party APIs'],
  },
]

export default function Services() {
  const [open, setOpen] = useState(0)

  return (
    <section id="services" className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Reveal dir="left">
          <div className="flex items-center gap-6 mb-16">
            <SectionLabel>Services</SectionLabel>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT sticky panel */}
          <Reveal dir="left" delay={0.1}>
            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <h2 className="font-black text-white tracking-tighter leading-none mb-4"
                  style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
                  What I Can<br />
                  <span className="shimmer-text">Do For You</span>
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                  From idea to production, I handle every layer of the stack — delivering fast, beautiful, and maintainable software.
                </p>
              </div>

              <ArrowBtn>Start a Project Now</ArrowBtn>

              {/* Preview card */}
              <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/60">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                  {['bg-red-500/70', 'bg-yellow-500/70', 'bg-green-500/70'].map(c => (
                    <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                  ))}
                  <div className="ml-2 flex-1 bg-zinc-800 rounded text-zinc-600 text-xs px-3 py-1 truncate">
                    talk2hire.com
                  </div>
                </div>
                <div className="relative aspect-video group overflow-hidden">
                  <img src="/Projects/Talk2Hire.png" alt="Talk2Hire"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-zinc-950/30 group-hover:bg-zinc-950/10 transition-colors duration-500" />
                  <button
                    onClick={() => window.open('https://talk2hire.com')}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-lime-400 flex items-center justify-center text-zinc-950 hover:scale-110 transition-transform cursor-pointer z-10 shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                    <MoveUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — accordion */}
          <div className="space-y-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.07}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    open === i
                      ? 'bg-zinc-900 border-lime-400/30 shadow-[0_0_40px_rgba(163,230,53,0.06)]'
                      : 'bg-zinc-900/30 border-zinc-800/60 hover:border-zinc-700'
                  }`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <div className="flex items-center gap-5 p-5">
                    <span className={`text-xs font-black font-mono w-6 shrink-0 transition-colors duration-200 ${open === i ? 'text-lime-400' : 'text-zinc-700'}`}>
                      {s.num}
                    </span>
                    <span className={`font-bold text-base flex-1 transition-colors duration-200 ${open === i ? 'text-white' : 'text-zinc-400'}`}>
                      {s.title}
                    </span>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm transition-all duration-300 shrink-0 ${
                      open === i ? 'bg-lime-400 border-lime-400 text-zinc-950 rotate-45' : 'border-zinc-700 text-zinc-600'
                    }`}>+</div>
                  </div>
                  <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div className="px-5 pb-5 ml-11">
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4">{s.desc}</p>
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
