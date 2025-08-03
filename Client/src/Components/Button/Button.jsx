import React from "react";
import { ScaleUpAnimation } from "../../utils/Animation";

const Button = ({ children, className = "", type = "submit", ...prop }) => {
  return (
    <ScaleUpAnimation>
      <button className={`${className}`} type={type} {...prop}>
        {children}
      </button>
    </ScaleUpAnimation>
  );
};

export default Button;
