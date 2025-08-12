/* eslint-disable no-unused-vars */
import React from "react";
import { easeIn, easeInOut, motion } from "framer-motion";

// slide in view animation
export const SlideInViewAnimation = ({ className = "", children, ...prop }) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeInOut }}
      viewport={{ once: true }}
      {...prop}
    >
      {children}
    </motion.div>
  );
};

// Slide Up Animation
export const SlideUpAnimation = ({ className = "", children, ...prop }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
      {...prop}
    >
      {children}
    </motion.div>
  );
};

// Slide Left Animation
export const SlideLeftAnimation = ({ className = "", children, ...prop }) => {
  return (
    <motion.div
      className={className}
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
      {...prop}
    >
      {children}
    </motion.div>
  );
};

// Slide Right Animation
export const SlideRightAnimation = ({ className = "", children, ...prop }) => {
  return (
    <motion.div
      className={className}
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeInOut }}
      {...prop}
    >
      {children}
    </motion.div>
  );
};

// Pop Up Animation
export const PopUpAnimation = ({ className = "", children, ...prop }) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2, ease: easeInOut }}
      {...prop}
    >
      {children}
    </motion.div>
  );
};

// Fade in with Slide up Animation
export const FadeInSlideUpAnimation = ({
  className = "",
  children,
  ...prop
}) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: easeInOut }}
      {...prop}
    >
      {children}
    </motion.div>
  );
};

// Scael animation for button
export const ScaleUpAnimation = ({ className = "", children, ...prop }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ ease: easeInOut }}
      className={`${className}`}
      {...prop}
    >
      {children}
    </motion.div>
  );
};
