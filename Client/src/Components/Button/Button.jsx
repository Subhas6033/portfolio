import React from "react";
import { ScaleUpAnimation } from "../../utils/Animation";

const Button = ({ children, className = "", wrapperClass ="", type = "submit", ...prop }) => {
  return (
    <ScaleUpAnimation className={wrapperClass}>
      <button className={`${className}`} type={type} {...prop}>
        {children}
      </button>
    </ScaleUpAnimation>
  );
};

export default Button;
