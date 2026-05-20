import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MoveUpRight, Github } from 'lucide-react'
import { SlideInViewAnimation } from '../../utils/Animation'
import { KEYFRAMES } from '../../Components/ui/animations'

const CATEGORIES = ['All', 'Fullstack', 'Frontend', 'Backend', 'College Related']

const PROJECTS = [
  {
    category: 'Fullstack',
    image: '/Projects/Talk2Hire.png',
    title: 'Talk2Hire',
    subtitle: 'AI powered Hiring & Interview Platform',
    tags: ['React', 'Node.js', 'AI', 'MongoDB'],
    live: 'https://talk2hire.com',
    featured: true,
  },
  {
    category: 'College Related',
    image: '/Projects/CDC.png',
    title: 'CDC Portal',
    subtitle: 'Carrier and Development Cell – JGEC',
    tags: ['MERN', 'MongoDB', 'College'],
    github: 'https://github.com/Subhas6033/CDC-Backend',
    live: 'https://cdcjgec.vercel.app',
  },
  {
    category: 'Frontend',
    image: '/Projects/EV.png',
    title: 'EV Dashboard',
    subtitle: 'Electrical Vehicle Dashboard',
    tags: ['React', 'Tailwind', 'Data Viz'],
    github: 'https://github.com/Subhas6033/Electric-Vehicle-Dashboard',
    live: 'https://ev-eosin.vercel.app/',
  },
  {
    category: 'Fullstack',
    image: '/Projects/employee.png',
    title: 'Employee Management System',
    subtitle: 'Role-based task & team management app',
    tags: ['MERN', 'Socket.io', 'Auth'],
    github: 'https://github.com/Subhas6033/Employee-Management-System',
    live: 'https://emsbysubhas.vercel.app/',
  },
  {
    category: 'Frontend',
    image: '/Projects/PanduAI.png',
    title: 'PANDU the AI',
    subtitle: 'Voice & text powered personal AI assistant',
    tags: ['React', 'AI', 'Voice API'],
    github: 'https://github.com/Subhas6033/PANDU',
    live: 'https://pandutheai.netlify.app/',
  },
]

function ProjectCard({ project, index }) {
  return (
    <SlideInViewAnimation>
      <div
        className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-lime-400/30 hover:bg-zinc-900 transition-all duration-500 overflow-hidden"
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 bg-lime-400 text-zinc-950 text-xs font-black px-2.5 py-1 rounded-full">
              Featured
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/60 text-zinc-400 text-xs font-medium px-2.5 py-1 rounded-full">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map(t => (
              <span key={t} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-white font-black text-lg tracking-tight group-hover:text-lime-400 transition-colors duration-300 mb-0.5">
            {project.title}
          </h3>
          <p className="text-zinc-500 text-xs mb-5 leading-relaxed">{project.subtitle}</p>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
            <Link
              to={project.github}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-zinc-800 text-zinc-500 text-xs font-semibold hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200"
            >
              <Github size={13} /> Code
            </Link>
            <Link
              to={project.live}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-zinc-800 bg-lime-400/0 text-zinc-500 text-xs font-semibold hover:bg-lime-400 hover:border-lime-400 hover:text-zinc-950 transition-all duration-200"
            >
              <MoveUpRight size={13} /> Live
            </Link>
          </div>
        </div>
      </div>
    </SlideInViewAnimation>
  )
}

const Project = () => {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active)

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-zinc-950 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
                style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}>
                <div className="w-2 h-2 bg-lime-400 rounded-sm" />
              </div>
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">Portfolio</span>
            </div>
            <h1 className="font-black text-white tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              All <span className="shimmer-text">Projects</span>
            </h1>
            <p className="text-zinc-500 text-base max-w-lg">
              A collection of things I've built — from production apps to experiments.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  active === cat
                    ? 'bg-lime-400 border-lime-400 text-zinc-950'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                }`}
              >
                {cat}
                {active === cat && (
                  <span className="ml-2 text-zinc-800 text-xs font-black">{filtered.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-white font-bold text-xl mb-2">No projects yet</h3>
              <p className="text-zinc-500 text-sm">Check back soon — more work is on the way.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Project
