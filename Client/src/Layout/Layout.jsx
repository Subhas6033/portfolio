import React, { useState, useEffect } from 'react'

/* ── Header ──────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Home', 'About', 'Services', 'Projects', 'Contact']

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-lime-400 rounded-sm flex items-center justify-center">
            <span className="text-zinc-950 font-black text-sm leading-none">P</span>
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            Port<span className="text-lime-400">folio</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-zinc-400 hover:text-lime-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
            >
              {l}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 bg-lime-400 text-zinc-950 text-sm font-bold px-5 py-2.5 rounded-full hover:bg-lime-300 transition-colors duration-200"
        >
          View Resume
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile menu btn */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href="#" className="text-zinc-300 hover:text-lime-400 text-base font-medium transition-colors">
              {l}
            </a>
          ))}
          <a href="#" className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 text-sm font-bold px-5 py-2.5 rounded-full w-fit mt-2">
            Start a Project →
          </a>
        </div>
      )}
    </header>
  )
}

/* ── Footer ──────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      title: 'Services',
      links: ['UI/UX Design', 'Web Development', 'Branding', 'Motion Design', 'Product Design'],
    },
    {
      title: 'Company',
      links: ['About', 'Projects', 'Process', 'Testimonials', 'Blog'],
    },
    {
      title: 'Connect',
      links: ['Twitter / X', 'LinkedIn', 'Dribbble', 'GitHub', 'Behance'],
    },
  ]

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-lime-400 rounded-sm flex items-center justify-center">
                <span className="text-zinc-950 font-black text-sm">P</span>
              </div>
              <span className="text-white font-bold text-base">
                Port<span className="text-lime-400">folio</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">
              A passionate product designer &amp; developer crafting functional, beautiful digital experiences for ambitious brands.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 text-sm font-bold px-5 py-2.5 rounded-full hover:bg-lime-300 transition-colors"
            >
              Start a Project →
            </a>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-zinc-500 hover:text-lime-400 text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">© 2025 Portfolio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((l) => (
              <a key={l} href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Layout ──────────────────────────────────────────── */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout