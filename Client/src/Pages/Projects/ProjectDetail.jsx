import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MoveUpRight, Github, Tag } from 'lucide-react'
import { KEYFRAMES } from '../../Components/ui/animations'

const PROJECTS = {
  'talk2hire': {
    title: 'Talk2Hire',
    subtitle: 'AI powered Hiring & Interview Platform',
    category: 'Fullstack',
    image: '/Projects/Talk2Hire.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'AI', 'JWT'],
    description: `Talk2Hire is a full-stack AI-powered hiring and interview platform that streamlines the recruitment process. It allows companies to post jobs, screen candidates automatically using AI, and conduct structured interviews — all in one place.`,
    highlights: [
      'AI-assisted candidate screening and scoring',
      'Real-time interview scheduling and management',
      'Role-based access for recruiters and candidates',
      'JWT-based authentication and protected routes',
      'Responsive UI built with React and Tailwind CSS',
    ],
    github: 'https://github.com/Subhas6033',
    live: 'https://talk2hire.com',
    year: '2025',
    featured: true,
  },
  'carrieranddevelopmentcelljgec': {
    title: 'CDC Portal',
    subtitle: 'Carrier and Development Cell – JGEC',
    category: 'College Related',
    image: '/Projects/CDC.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'MERN'],
    description: `The Carrier and Development Cell (CDC) portal for Jalpaiguri Government Engineering College is a full-stack MERN application that helps students access placement opportunities, resources, and announcements from the college's training and placement cell.`,
    highlights: [
      'Student and admin dashboards with role-based access',
      'Notice board for placement announcements',
      'Company and job listing management',
      'REST API with Express and MongoDB backend',
    ],
    github: 'https://github.com/Subhas6033',
    live: '#',
    year: '2024',
  },
  'ev-dashboard': {
    title: 'EV Dashboard',
    subtitle: 'Electrical Vehicle Dashboard',
    category: 'Frontend',
    image: '/Projects/EV.png',
    tags: ['React', 'Tailwind CSS', 'Data Visualization', 'Charts'],
    description: `An interactive Electric Vehicle dashboard built with React that allows users to explore detailed information about electric vehicles. Users can view specifications, track vehicle data, and explore manufacturing history based on selected years for deeper insights.`,
    highlights: [
      'Interactive charts and data visualizations',
      'Filter vehicles by year and manufacturer',
      'Responsive design for all screen sizes',
      'Clean component architecture with React hooks',
    ],
    github: 'https://github.com/Subhas6033/Electric-Vehicle-Dashboard',
    live: 'https://ev-eosin.vercel.app/',
    year: '2024',
  },
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS[id]

  if (!project) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
          <div className="text-7xl mb-6">404</div>
          <h1 className="text-white font-black text-3xl mb-3">Project not found</h1>
          <p className="text-zinc-500 mb-8">This project doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 font-bold px-5 py-2.5 rounded-full hover:bg-lime-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-zinc-950 pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-6">

          {/* Back button */}
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-lime-400 text-sm font-medium transition-colors duration-200 mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            All Projects
          </button>

          {/* Hero image */}
          <div className="anim-scaleIn relative rounded-3xl overflow-hidden border border-zinc-800 mb-10"
            style={{ height: '420px' }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              {project.featured && (
                <span className="bg-lime-400 text-zinc-950 text-xs font-black px-3 py-1.5 rounded-full anim-pulseGlow">
                  Featured
                </span>
              )}
              <span className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/60 text-zinc-400 text-xs font-medium px-3 py-1.5 rounded-full">
                {project.category}
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-6 left-6">
              <div className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{project.subtitle}</div>
              <h1 className="text-white font-black text-4xl tracking-tighter">{project.title}</h1>
            </div>

            <div className="absolute bottom-6 right-6 text-zinc-600 font-mono text-sm">{project.year}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

            {/* LEFT — content */}
            <div className="anim-fadeUp">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(t => (
                  <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="border-l-2 border-lime-400/40 pl-5 mb-8">
                <p className="text-zinc-300 text-base leading-relaxed">{project.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Key Features</div>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT — links card */}
            <div className="anim-fadeRight">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4 lg:sticky lg:top-28">
                <div className="text-zinc-500 text-xs uppercase tracking-widest">Links</div>

                <Link
                  to={project.live}
                  target="_blank"
                  className="flex items-center justify-between w-full p-4 rounded-xl border border-zinc-800 bg-lime-400/5 hover:bg-lime-400 hover:border-lime-400 group transition-all duration-200"
                >
                  <div>
                    <div className="text-white group-hover:text-zinc-950 font-bold text-sm transition-colors duration-200">Live Demo</div>
                    <div className="text-zinc-500 group-hover:text-zinc-700 text-xs transition-colors duration-200 truncate max-w-[160px]">{project.live}</div>
                  </div>
                  <MoveUpRight size={16} className="text-lime-400 group-hover:text-zinc-950 group-hover:rotate-12 transition-all duration-200" />
                </Link>

                <Link
                  to={project.github}
                  target="_blank"
                  className="flex items-center justify-between w-full p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 group transition-all duration-200"
                >
                  <div>
                    <div className="text-white group-hover:text-lime-400 font-bold text-sm transition-colors duration-200">Source Code</div>
                    <div className="text-zinc-600 text-xs">GitHub Repository</div>
                  </div>
                  <Github size={16} className="text-zinc-600 group-hover:text-lime-400 transition-colors duration-200" />
                </Link>

                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  {[
                    { label: 'Category', val: project.category },
                    { label: 'Year',     val: project.year },
                    { label: 'Stack',    val: project.tags.slice(0, 3).join(', ') },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="text-zinc-600 text-xs">{r.label}</span>
                      <span className="text-zinc-400 text-xs font-medium">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
