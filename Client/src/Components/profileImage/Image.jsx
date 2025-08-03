import React from "react";
import { PopUpAnimation } from "../../utils/Animation";

export const ProfileImage = ({
  imageUrl,
  alt = "image",
  wrapperClass = "",
  containerClass = "",
  innerClass = "",
  imageClass = "",
}) => {
  return (
    <PopUpAnimation
      className={`flex justify-center md:justify-end order-1 md:order-2 ${wrapperClass}`}
    >
      <div
        className={`w-40 h-40 md:w-80 md:h-80 rotate-45 transform-gpu rounded-3xl overflow-hidden shadow-2xl hover:shadow-white/30 transition-shadow duration-500 border-4 border-white ${containerClass}`}
      >
        <div
          className={`-rotate-45 transform-gpu w-full h-full scale-[1.42] md:scale-[1.64] ${innerClass}`}
        >
          <img
            src={imageUrl}
            alt={alt}
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${imageClass}`}
          />
        </div>
      </div>
    </PopUpAnimation>
  );
};

export const Image = ({
  wrapperClass = "",
  className = "",
  imageURL,
  alt = '',
}) => {
  return (
    <PopUpAnimation className={`${wrapperClass}`}>
      <img src={imageURL} alt={alt} className={`${className}`} />
    </PopUpAnimation>
  )
}
