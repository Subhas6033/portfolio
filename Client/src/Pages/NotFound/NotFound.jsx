import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lime-400/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-orbitron)] text-8xl md:text-9xl font-black text-lime-400 tracking-wider leading-none">
            404
          </h1>
          <div className="h-1 w-24 bg-lime-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Message */}
        <h2 className="text-white font-bold text-2xl md:text-3xl mb-3">
          Page Not Found
        </h2>
        <p className="text-zinc-400 text-base md:text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 font-black text-sm px-6 py-3 rounded-full hover:bg-lime-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.35)] transition-all duration-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-zinc-700 text-white font-semibold text-sm px-6 py-3 rounded-full hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
          >
            Contact Me
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer link */}
      <div className="absolute bottom-8 text-zinc-500 text-sm">
        Go back to{" "}
        <Link to="/" className="text-lime-400 hover:underline">
          Subhas Mondal
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
