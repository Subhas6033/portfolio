import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionLabel, ArrowBtn, Reveal } from '../../../Components/ui'

export default function CTABanner() {
  const navigate = useNavigate()
  return (
    <section id="contact" className="bg-zinc-950 py-24 relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

      {/* Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(163,230,53,0.07) 0%,transparent 70%)', filter: 'blur(80px)', animation: 'floatY 8s ease-in-out infinite' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — big text */}
          <div>
            <Reveal dir="left"><SectionLabel>Let's Work Together</SectionLabel></Reveal>
            <Reveal dir="left" delay={0.1}>
              <h2 className="font-black text-white tracking-tighter leading-none mb-6"
                style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}>
                Have a<br />
                <span style={{ WebkitTextStroke: '2px #a3e635', color: 'transparent' }}>project</span><br />
                in mind?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-zinc-500 text-base leading-relaxed mb-8 max-w-md">
                I take on select projects each quarter to ensure every client gets my full focus and best work.
              </p>
              <div className="flex items-center gap-4">
                <ArrowBtn onClick={() => navigate('/contact')}>Send a Message</ArrowBtn>
                <ArrowBtn outline onClick={() => navigate('/projects')}>View Portfolio</ArrowBtn>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — contact info */}
          <Reveal dir="right" delay={0.15}>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-6">
              <div className="text-zinc-400 text-sm font-semibold uppercase tracking-widest">Contact Details</div>

              {[
                { icon: '📧', label: 'Email', val: 'goalkeepersubhas07@gmail.com', href: 'mailto:goalkeepersubhas07@gmail.com' },
                { icon: '📞', label: 'Phone', val: '+91 9832395096', href: 'tel:+919832395096' },
                { icon: '🌐', label: 'Website', val: 'subhas.vercel.app', href: 'https://subhas.vercel.app' },
                { icon: '📍', label: 'Location', val: 'West Bengal, India', href: null },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-base shrink-0 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 transition-all duration-200">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-zinc-600 text-xs">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-white text-sm font-medium truncate block group-hover:text-lime-400 transition-colors duration-200">
                        {c.val}
                      </a>
                    ) : (
                      <div className="text-white text-sm font-medium">{c.val}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-zinc-400 text-sm">Currently available for new projects</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
