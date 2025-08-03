import React from "react";
import { ScaleUpAnimation } from "../utils/Animation";


const Button = ({ children, className = "", type = "submit", ...prop }) => {
  return (
    <ScaleUpAnimation
      className={`${className}`}
      type={type}
      {...prop}
    >
      {children}
    </ScaleUpAnimation>
  );
};

export default Button;
