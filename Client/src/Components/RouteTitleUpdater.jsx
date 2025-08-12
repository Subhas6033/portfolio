import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Subhas Mondal | Full Stack Developer",
      "/about": "About | Full stack Developer",
      "/projects": "Projects | Full stack Developer",
      "/achievement": "Achievements | Full stack Developer",
      "/contact": "Contact me | FUll stack Developer",
    };
    document.title = titles[location.pathname] || "Subhas Mondal || Full stack Developer";
  }, [location]);
  return null;
};

export default RouteTitleUpdater;
