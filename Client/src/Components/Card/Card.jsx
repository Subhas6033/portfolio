import React from "react";

const Card = ({
  children,
  wrapperClassName = "",
  cardClassName = "",
  shadow = "shadow-md",
  rounded = "rounded-2xl",
  padding = "",
  background = "bg-white",
  hoverEffect = true,
}) => {
  return (
    <div className={`${wrapperClassName}`}>
      <div
        className={`${background} ${rounded} ${shadow} ${padding} ${
          hoverEffect
            ? "transition-transform duration-300 hover:scale-[1.02]"
            : ""
        } ${cardClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
