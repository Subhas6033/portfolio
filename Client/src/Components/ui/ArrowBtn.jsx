import React from "react";

const ArrowBtn = ({ children, outline, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`btn-ripple inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 group ${
      outline
        ? "border border-zinc-700 text-zinc-300 hover:border-lime-400 hover:text-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)]"
        : "bg-lime-400 text-zinc-950 hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] active:scale-95"
    } ${className}`}
  >
    {children}
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default ArrowBtn;
