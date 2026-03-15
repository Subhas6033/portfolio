import React from 'react'

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div
      className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
      style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
    >
      <div className="w-2 h-2 bg-lime-400 rounded-sm" />
    </div>
    <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">{children}</span>
  </div>
)

export default SectionLabel
