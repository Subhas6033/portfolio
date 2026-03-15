import React, { useState } from 'react'
import { SectionLabel, Reveal } from '../../../Components/ui'

const FAQS = [
  { q: 'What services do you offer?',       a: 'Fullstack web development (MERN), frontend & backend development, database design, and API integration.' },
  { q: 'How fast will I receive my work?',   a: 'Design projects: 1–3 weeks. Development projects: 2–8 weeks depending on scope.' },
  { q: "What's your development process?",   a: 'Discovery → Planning → Development → Testing → Deployment. Iterative with feedback loops at each stage.' },
  { q: 'What if I have a single project?',   a: 'No problem — I work on one-off projects as well as ongoing retainer arrangements.' },
  { q: 'Do you offer ongoing support?',      a: 'Yes! Monthly retainer packages available for ongoing support, updates, and iteration.' },
  { q: 'Are there hidden costs?',            a: 'Never. All pricing agreed upfront. Scope changes are discussed and approved before work begins.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

          {/* LEFT */}
          <Reveal dir="left">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Support</SectionLabel>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-4">
                Frequently<br/>
                <span className="text-lime-400">Asked</span>
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Have a question not listed here? Reach out and I'll get back within 24 hours.
              </p>
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <a href="mailto:goalkeepersubhas07@gmail.com"
                  className="text-lime-400 text-sm font-semibold hover:underline">
                  goalkeepersubhas07@gmail.com →
                </a>
              </div>
            </div>
          </Reveal>

          {/* RIGHT */}
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                    open === i
                      ? 'bg-zinc-800/80 border-lime-400/20'
                      : 'bg-zinc-800/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
                  }`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex items-center gap-4 p-5">
                    <span className={`text-xs font-black font-mono w-5 shrink-0 ${open === i ? 'text-lime-400' : 'text-zinc-700'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-sm font-semibold flex-1 transition-colors duration-200 ${open === i ? 'text-lime-400' : 'text-zinc-300'}`}>
                      {f.q}
                    </span>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 transition-all duration-300 ${
                      open === i ? 'bg-lime-400 border-lime-400 text-zinc-950 rotate-45' : 'border-zinc-700 text-zinc-600'
                    }`}>+</div>
                  </div>
                  <div style={{ maxHeight: open === i ? 160 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div className="px-5 pb-5 ml-9">
                      <p className="text-zinc-500 text-sm leading-relaxed">{f.a}</p>
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
