import React from 'react'

const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }).map((_, i) => (
      <svg
        key={i} width="12" height="12" viewBox="0 0 12 12" fill="#a3e635"
        style={{ animation: `wobble ${1 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
      >
        <path d="M6 1l1.34 2.72L10.5 4.2l-2.25 2.2.53 3.1L6 8.02 3.22 9.5l.53-3.1L1.5 4.2l3.16-.48z" />
      </svg>
    ))}
  </div>
)

export default Stars
