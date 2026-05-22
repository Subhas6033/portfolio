import React from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Social SVG Icons ─────────────────────────────────── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

/* ── Footer ──────────────────────────────────────────── */
function Footer() {
  const navigate = useNavigate()

  const services = ['Fullstack Development', 'Frontend Development', 'Backend Development', 'Database Design', 'API Integration']
  const socials = [
    { label: 'GitHub',   href: 'https://github.com/Subhas6033',         Icon: GithubIcon   },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/subhas6033/', Icon: LinkedinIcon },
    { label: 'Twitter',  href: 'https://x.com/SubhasM25064046',                         Icon: TwitterIcon  },
    { label: 'Email',    href: 'mailto:goalkeepersubhas07@gmail.com',    Icon: EmailIcon    },
  ]

  const scrollToSection = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-zinc-950 relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(163,230,53,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-14 pb-14 border-b border-zinc-800/60">
          <div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">Open to work</p>
            <h2 className="font-black text-white tracking-tighter leading-none" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Let's build something<br />
              <span style={{ WebkitTextStroke: '1.5px #a3e635', color: 'transparent' }}>great together.</span>
            </h2>
          </div>
          <button
            onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="shrink-0 inline-flex items-center gap-2 bg-lime-400 text-zinc-950 text-sm font-black px-6 py-3 rounded-full hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all duration-300 hover:cursor-pointer"
          >
            Hire me
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-lime-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                <span className="text-zinc-950 font-black text-base leading-none">S</span>
              </div>
              <div>
                <div className="text-white font-black text-sm leading-none">Subhas Mondal</div>
                <div className="text-zinc-600 text-xs mt-0.5">Fullstack Developer</div>
              </div>
            </div>
            <p className="text-zinc-600 text-sm leading-relaxed mb-6">
              Building fast, scalable web applications with the MERN stack — clean code, sharp UIs, real impact.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-lime-400/40 hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-200">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="group flex items-center gap-2 text-zinc-600 hover:text-lime-400 text-sm transition-colors duration-200 text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-lime-400 transition-colors duration-200 shrink-0" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: '✉', val: 'goalkeepersubhas07@gmail.com', href: 'mailto:goalkeepersubhas07@gmail.com' },
                { icon: '📞', val: '+91 9832395096',               href: 'tel:+919832395096'                  },
                { icon: '📍', val: 'West Bengal, India',           href: null                                  },
                { icon: '🌐', val: 'subhas.vercel.app',            href: 'https://subhas.vercel.app'           },
              ].map(c => (
                <li key={c.val}>
                  {c.href ? (
                    <a href={c.href} className="flex items-center gap-2.5 text-zinc-600 hover:text-lime-400 text-sm transition-colors duration-200">
                      <span className="text-base shrink-0">{c.icon}</span>
                      <span className="truncate">{c.val}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2.5 text-zinc-600 text-sm">
                      <span className="text-base shrink-0">{c.icon}</span>
                      {c.val}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} Subhas Mondal. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-zinc-700 text-xs">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer