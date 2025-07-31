import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, className = "", type = "submit", ...prop }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`${className}`}
      type={type}
      {...prop}
    >
      {children}
    </motion.button>
  );
};

export default Button;
