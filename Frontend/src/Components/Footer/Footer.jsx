import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base">
        <p className="text-center md:text-left">
        copyright  &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="text-center md:text-right">
          Made with <span className="text-pink-400">💖</span> by{" "}
          <span className="font-bold text-amber-400 hover:underline cursor-pointer">
            Subhas
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
