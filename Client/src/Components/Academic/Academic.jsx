import React from "react";
import { Calendar } from "lucide-react";
import {
  SlideLeftAnimation,
  SlideRightAnimation,
  SlideUpAnimation,
} from "../../utils/Animation";

const Timeline = ({
  data,
  icon: Icon,
  subtitleKey = "institution",
  linkLabel,
  linkKey,
}) => {
  return (
    <section className="relative flex flex-col items-center py-12">
      <div className="relative w-full max-w-5xl">
        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 h-full w-px bg-gradient-to-b from-lime-400/0 via-lime-400/40 to-lime-400/0" />

        {/* Timeline Items */}
        {data.map((item, index) => {
          const AnimationWrapper =
            index % 2 === 0 ? SlideRightAnimation : SlideLeftAnimation;
          const subtitle = item[subtitleKey];

          return (
            <AnimationWrapper
              key={index}
              className="relative mb-20 flex w-full items-center"
            >
              {/* Timeline Box */}
              <div
                className={`p-6 rounded-xl bg-zinc-900/80 border border-zinc-800/60 text-white shadow-xl
                ml-auto w-10/12 sm:w-5/12
                ${item.align === "left" ? "sm:ml-0 sm:mr-auto" : "sm:ml-auto sm:mr-0"}
              `}
              >
                {subtitle && (
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-lime-400" />
                    <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                      {subtitle}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                {item.period && (
                  <p className="flex items-center text-sm text-zinc-500 mt-1">
                    <Calendar size={14} className="mr-1" />
                    {item.period}
                  </p>
                )}
                {item.location && (
                  <p className="text-sm text-zinc-500 mt-1">{item.location}</p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
                {linkLabel && item[linkKey] && (
                  <a
                    href={item[linkKey]}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 px-4 py-2 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold hover:bg-lime-400/20 transition-all duration-200"
                  >
                    {linkLabel}
                  </a>
                )}
              </div>

              {/* Icon */}
              <SlideUpAnimation
                className="absolute left-4 sm:left-1/2 top-1/2
                -translate-y-1/2 -translate-x-1/2
                bg-zinc-950 w-12 h-12 sm:w-16 sm:h-16
                rounded-full border-2 border-lime-400/40
                flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.2)]"
              >
                <Icon size={20} className="sm:size-24 text-lime-400" />
              </SlideUpAnimation>
            </AnimationWrapper>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
