import React from 'react'

const Tag = ({ children, yellow }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-200 hover:scale-105 ${
    yellow
      ? 'bg-lime-400/10 border-lime-400/30 text-lime-400 hover:bg-lime-400/20'
      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
  }`}>{children}</span>
)

export default Tag
