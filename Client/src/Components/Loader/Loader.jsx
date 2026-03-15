import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  '> Initializing runtime environment...',
  '> Loading core modules [React, Node, MongoDB]',
  '> Establishing secure connection...',
  '> Compiling portfolio assets...',
  '> Mounting UI components...',
  '> All systems operational.',
]

function useTypingLines(lines, charDelay = 18, lineDelay = 320) {
  const [displayed, setDisplayed] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= lines.length) return
    const line = lines[currentLine]
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), charDelay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed(d => [...d, line])
      setCurrentLine(l => l + 1)
      setCurrentChar(0)
    }, lineDelay)
    return () => clearTimeout(t)
  }, [currentLine, currentChar, lines, charDelay, lineDelay])

  const typing = currentLine < lines.length ? lines[currentLine].slice(0, currentChar) : null
  return { displayed, typing }
}

const Loader = () => {
  const [progress, setProgress] = useState(0)
  const { displayed, typing } = useTypingLines(BOOT_LINES)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 60 ? Math.random() * 8 + 4 : Math.random() * 3 + 1
        return Math.min(p + step, 100)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden font-mono">

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(163,230,53,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.025) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(163,230,53,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-lg mx-6"
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 border-b-0 rounded-t-xl px-4 py-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 text-center text-zinc-600 text-xs tracking-widest">
            subhas@portfolio:~
          </div>
          <div className="w-12" />
        </div>

        {/* Terminal body */}
        <div className="bg-zinc-950/95 border border-zinc-800 rounded-b-xl p-5 min-h-[220px]"
          style={{ boxShadow: '0 0 60px rgba(163,230,53,0.06), inset 0 0 60px rgba(0,0,0,0.4)' }}>

          {/* Static header */}
          <div className="text-lime-400/50 text-xs mb-4">
            <div>SUBHAS MONDAL — PORTFOLIO OS v2.0</div>
            <div>Booting system... please wait.</div>
            <div className="mt-1 border-t border-zinc-800/80 pt-2" />
          </div>

          {/* Boot lines */}
          <div className="space-y-1.5 mb-3">
            {displayed.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs"
              >
                <span className={line.includes('operational') ? 'text-lime-400' : 'text-zinc-500'}>
                  {line}
                </span>
                {line.includes('operational') && (
                  <span className="ml-2 text-lime-400">✓</span>
                )}
              </motion.div>
            ))}

            {/* Currently typing line */}
            {typing !== null && (
              <div className="text-zinc-400 text-xs">
                {typing}
                <span className="inline-block w-1.5 h-3 bg-lime-400 ml-0.5 align-middle"
                  style={{ animation: 'blink 1s step-end infinite' }} />
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-5 pt-4 border-t border-zinc-800/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-600 text-xs uppercase tracking-widest">Loading</span>
              <span className="text-lime-400 text-xs font-bold tabular-nums">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-lime-400 rounded-full"
                style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(163,230,53,0.7)' }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-zinc-700 text-xs tracking-widest uppercase z-20"
      >
        Fullstack Developer · MERN Stack
      </motion.div>

      {/* Keyframe for blink */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

export default Loader
