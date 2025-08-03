/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const socialAccount = [
    {
      icon: FaFacebook,
      url: "https://facebook.com/subhas.mondal.110244",
      label: "Facebook",
      hoverClass : "hover:text-blue-500"
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com/goalkeepersubhas",
      label: "Instagram",
      hoverClass : "hover:text-pink-500"
    },
    {
      icon: FaGithub,
      url: "https://github.com/Subhas6033",
      label: "Github",
      hoverClass : "hover:text-slate-500"
    },
    {
      icon: FaLinkedinIn,
      url: "https://linkedin.com/in/subhas-mondal-bubai6033/",
      label: "Linedin",
      hoverClass : "hover:text-indigo-600"
    },
  ];

  return (
    <footer className="bg-gray-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base">
        {/* Copyright */}
        <p className="text-center md:text-left w-full md:w-auto">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>

        {/* Social Icons */}
        <ul className="flex justify-evenly items-center gap-5">
          {socialAccount.map(({ icon : Icon, url, label, hoverClass }, index) => (
            <li key={index}>
              <Link to={url} aria-label={label}>
                <Icon className={`size-6 transition-all duration-300 ${hoverClass}`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Signature */}
        <p className="text-center md:text-right w-full md:w-auto">
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
