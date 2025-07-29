import React from "react";

const Image = ({
  imageUrl,
  alt = "image",
  wrapperClass = "",
  containerClass = "",
  innerClass = "",
  imageClass = "",
}) => {
  return (
    <div
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
    </div>
  );
};

export default Image;
