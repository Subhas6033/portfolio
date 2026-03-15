import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MoveUpRight, ArrowRight } from 'lucide-react'
import { Tag, SectionLabel, ArrowBtn, Reveal } from '../../../Components/ui'

const PROJECTS = [
  {
    title: 'Talk2Hire',
    subtitle: 'AI powered Hiring & Interview Platform',
    category: 'Fullstack',
    tags: ['React', 'Node.js', 'AI'],
    image: '/Projects/Talk2Hire.png',
    route: '/projects/talk2hire',
    num: '01',
  },
  {
    title: 'CDC Portal',
    subtitle: 'Carrier and Development Cell',
    category: 'MERN · College',
    date: 'Sep 2024',
    tags: ['MERN', 'MongoDB'],
    image: '/Projects/CDC.png',
    route: '/projects/carrieranddevelopmentcelljgec',
    num: '02',
  },
  {
    title: 'EV Dashboard',
    subtitle: 'Electrical Vehicle Dashboard',
    category: 'Web Development',
    date: 'Oct 2024',
    tags: ['React', 'Tailwind'],
    image: '/Projects/EV.png',
    route: '/projects/ev-dashboard',
    num: '03',
  },
]

function FeaturedCard({ p }) {
  return (
    <Link to={p.route}
      className="group relative rounded-3xl overflow-hidden border border-zinc-800 hover:border-lime-400/30 transition-all duration-500 block bg-zinc-900"
      style={{ height: '480px' }}>
      <img src={p.image} alt={p.title}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10" />

      {/* Number */}
      <div className="absolute top-6 left-6 text-zinc-800 font-black text-7xl leading-none select-none pointer-events-none"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}>
        {p.num}
      </div>

      {/* Category badge */}
      <div className="absolute top-6 right-6 bg-lime-400/10 backdrop-blur-sm border border-lime-400/20 text-lime-400 text-xs font-bold px-3 py-1.5 rounded-full">
        {p.category}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{p.subtitle}</div>
            <h3 className="text-white font-black text-2xl tracking-tight group-hover:text-lime-400 transition-colors duration-300">
              {p.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-lime-400/0 border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:bg-lime-400 group-hover:border-lime-400 group-hover:text-zinc-950 transition-all duration-300 group-hover:rotate-45 shrink-0 ml-4">
            <MoveUpRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  )
}

function SmallCard({ p, delay }) {
  return (
    <Reveal delay={delay} dir="right">
      <Link to={p.route}
        className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 hover:border-lime-400/30 hover:bg-zinc-900/80 transition-all duration-400">
        <div className="text-zinc-800 font-black text-3xl w-10 shrink-0 leading-none">{p.num}</div>
        <div className="w-16 h-14 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-zinc-500 text-xs mb-0.5">{p.category} · {p.date}</div>
          <div className="text-white font-bold text-sm truncate group-hover:text-lime-400 transition-colors duration-300">{p.subtitle}</div>
        </div>
        <MoveUpRight size={14} className="text-zinc-700 group-hover:text-lime-400 transition-colors duration-300 shrink-0 group-hover:rotate-12" />
      </Link>
    </Reveal>
  )
}

export default function Projects() {
  const navigate = useNavigate()
  return (
    <section id="projects" className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <Reveal dir="left">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
              Recent<br/><span className="shimmer-text">Projects</span>
            </h2>
          </Reveal>
          <Reveal dir="right">
            <ArrowBtn outline onClick={() => navigate('/projects')}>All Projects</ArrowBtn>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Featured */}
          <Reveal dir="scale">
            <FeaturedCard p={PROJECTS[0]} />
          </Reveal>

          {/* Small cards stacked */}
          <div className="flex flex-col gap-4 justify-between">
            {PROJECTS.slice(1).map((p, i) => (
              <SmallCard key={p.title} p={p} delay={i * 0.1} />
            ))}

            {/* View all card */}
            <Reveal delay={0.25} dir="right">
              <button onClick={() => navigate('/projects')}
                className="group flex items-center justify-between p-4 rounded-2xl border border-dashed border-zinc-800 hover:border-lime-400/40 transition-all duration-300 w-full">
                <span className="text-zinc-500 text-sm font-medium group-hover:text-lime-400 transition-colors duration-300">View all projects</span>
                <ArrowRight size={16} className="text-zinc-700 group-hover:text-lime-400 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
