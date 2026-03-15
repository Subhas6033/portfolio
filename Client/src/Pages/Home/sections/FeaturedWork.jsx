import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionLabel, ArrowBtn, Reveal } from '../../../Components/ui'

const WORKS = [
  { num: '01', title: 'Talk2Hire Platform', url : "https://talk2hire.com",     cat: 'Fullstack Development', year: '2026' },
  { num: '02', title: 'CDC Portal',     url : "https://cdcjgec.vercel.app",        cat: 'MERN · College Project', year: '2025' },
  { num: '03', title: 'EV Dashboard',    url : "https://ev-eosin.vercel.app",       cat: 'React · Data Viz',       year: '2025' },
  // { num: '04', title: 'Brand Identity System',  cat: 'UI/UX Design',           year: '2025' },
]

export default function FeaturedWork() {
  const navigate = useNavigate()
  return (
    <section id="work" className="bg-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <Reveal dir="left">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
              Selected<br/><span className="shimmer-text">Showcase</span>
            </h2>
          </Reveal>
          <Reveal dir="right" delay={0.1}>
            <ArrowBtn className='hover:cursor-pointer' outline onClick={() => navigate("/projects")}>All Projects</ArrowBtn>
          </Reveal>
        </div>

        {/* List style */}
        <div className="border-t border-zinc-800">
          {WORKS.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="group flex items-center gap-6 py-6 border-b border-zinc-800 cursor-pointer hover:pl-3 transition-all duration-300" onClick={() => window.open(w.url, '_blank', 'noopener,noreferrer')}>
                <span className="text-zinc-800 text-sm font-black font-mono group-hover:text-lime-400 transition-colors duration-300 w-8 shrink-0">
                  {w.num}
                </span>
                <div className="flex-1">
                  <div className="text-white font-black text-2xl md:text-3xl tracking-tight group-hover:text-lime-400 transition-colors duration-300">
                    {w.title}
                  </div>
                </div>
                <div className="hidden md:block text-zinc-600 text-sm">{w.cat}</div>
                <div className="text-zinc-700 text-sm font-mono">{w.year}</div>
                <div className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:bg-lime-400 group-hover:border-lime-400 group-hover:text-zinc-950 transition-all duration-300 group-hover:rotate-45 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
