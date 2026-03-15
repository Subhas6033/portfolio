import React from 'react'

// Devicon CDN class names for each tech
const ITEMS = {
  'C':            { icon: 'devicon-c-plain',             color: 'from-blue-600/20 to-blue-500/5',       border: 'border-blue-600/30',     iconColor: '#659ad2' },
  'C++':          { icon: 'devicon-cplusplus-plain',     color: 'from-blue-500/20 to-blue-400/5',       border: 'border-blue-500/30',     iconColor: '#9c4fb5' },
  'Java':         { icon: 'devicon-java-plain',          color: 'from-orange-600/20 to-orange-500/5',   border: 'border-orange-600/30',   iconColor: '#f89820' },
  'JavaScript':   { icon: 'devicon-javascript-plain',   color: 'from-yellow-400/20 to-yellow-300/5',   border: 'border-yellow-400/30',   iconColor: '#f7df1e' },
  'Python':       { icon: 'devicon-python-plain',       color: 'from-sky-500/20 to-sky-400/5',         border: 'border-sky-500/30',      iconColor: '#4b8bbe' },
  'TypeScript':   { icon: 'devicon-typescript-plain',   color: 'from-blue-500/20 to-blue-400/5',       border: 'border-blue-500/30',     iconColor: '#3178c6' },
  'HTML5':        { icon: 'devicon-html5-plain',        color: 'from-orange-500/20 to-orange-400/5',   border: 'border-orange-500/30',   iconColor: '#e34f26' },
  'CSS3':         { icon: 'devicon-css3-plain',         color: 'from-indigo-500/20 to-indigo-400/5',   border: 'border-indigo-500/30',   iconColor: '#264de4' },
  'React':        { icon: 'devicon-react-original',     color: 'from-cyan-500/20 to-cyan-400/5',       border: 'border-cyan-500/30',     iconColor: '#61dafb' },
  'Next.js':      { icon: 'devicon-nextjs-plain',       color: 'from-zinc-400/10 to-zinc-300/5',       border: 'border-zinc-500/30',     iconColor: '#ffffff' },
  'Node.js':      { icon: 'devicon-nodejs-plain',       color: 'from-green-500/20 to-green-400/5',     border: 'border-green-500/30',    iconColor: '#339933' },
  'MongoDB':      { icon: 'devicon-mongodb-plain',      color: 'from-emerald-500/20 to-emerald-400/5', border: 'border-emerald-500/30',  iconColor: '#47a248' },
  'MySQL':        { icon: 'devicon-mysql-plain',        color: 'from-teal-500/20 to-teal-400/5',       border: 'border-teal-500/30',     iconColor: '#00758f' },
  'Figma':        { icon: 'devicon-figma-plain',        color: 'from-purple-500/20 to-purple-400/5',   border: 'border-purple-500/30',   iconColor: '#f24e1e' },
  'Tailwind':     { icon: 'devicon-tailwindcss-plain',  color: 'from-sky-500/20 to-sky-400/5',         border: 'border-sky-500/30',      iconColor: '#38bdf8' },
  'Express':      { icon: 'devicon-express-original',   color: 'from-zinc-500/20 to-zinc-400/5',       border: 'border-zinc-500/30',     iconColor: '#aaaaaa' },
  'Git':          { icon: 'devicon-git-plain',          color: 'from-red-500/20 to-red-400/5',         border: 'border-red-500/30',      iconColor: '#f05032' },
  'Redux':        { icon: 'devicon-redux-original',     color: 'from-violet-500/20 to-violet-400/5',   border: 'border-violet-500/30',   iconColor: '#764abc' },
}

const ROW1 = ['C', 'C++', 'Java', 'JavaScript', 'Python', 'TypeScript', 'HTML5', 'CSS3', 'Git',
              'C', 'C++', 'Java', 'JavaScript', 'Python', 'TypeScript', 'HTML5', 'CSS3', 'Git']
const ROW2 = ['React', 'Next.js', 'Node.js', 'MongoDB', 'MySQL', 'Figma', 'Tailwind', 'Express', 'Redux',
              'React', 'Next.js', 'Node.js', 'MongoDB', 'MySQL', 'Figma', 'Tailwind', 'Express', 'Redux']

function TickerItem({ t }) {
  const s = ITEMS[t] || { icon: '', color: 'from-zinc-500/20 to-zinc-400/5', border: 'border-zinc-500/30', iconColor: '#aaaaaa' }

  return (
    <span className="flex items-center gap-3 whitespace-nowrap group cursor-default select-none px-1">
      {/* Icon badge */}
      <span className={`
        w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} border ${s.border}
        flex items-center justify-center
        transition-all duration-300 group-hover:scale-110
        group-hover:shadow-[0_0_14px_rgba(163,230,53,0.15)]
        group-hover:border-lime-400/30
      `}>
        <i
          className={`${s.icon} text-lg`}
          style={{ color: s.iconColor }}
        />
      </span>

      {/* Label */}
      <span className="text-zinc-500 font-semibold text-xs uppercase tracking-widest transition-colors duration-300 group-hover:text-zinc-300">
        {t}
      </span>

      {/* Separator dot */}
      <span className="w-1 h-1 rounded-full bg-zinc-800 mx-2 shrink-0" />
    </span>
  )
}

export default function ToolsTicker() {
  return (
    <>
      {/* Load Devicons font */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      <div id="skills" className="relative py-10 overflow-hidden bg-zinc-950">

        {/* Top & bottom border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
          <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Tech Stack</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #09090b 0%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #09090b 0%, transparent 100%)' }} />

        {/* Row 1 — left to right */}
        <div className="flex w-max mb-3" style={{ animation: 'ticker 40s linear infinite' }}>
          {ROW1.map((t, i) => <TickerItem key={i} t={t} />)}
        </div>

        {/* Row 2 — right to left */}
        <div className="flex w-max" style={{ animation: 'ticker 32s linear infinite reverse' }}>
          {ROW2.map((t, i) => <TickerItem key={i} t={t} />)}
        </div>
      </div>
    </>
  )
}