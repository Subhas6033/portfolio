import React from "react";
import { GraduationCap, Calendar } from "lucide-react";
import {
  SlideLeftAnimation,
  SlideRightAnimation,
  SlideUpAnimation,
} from "../../utils/Animation";
import Button from "../Button/Button";

const timelineData = [
  {
    title: "B.Tech in IT",
    period: "2023 - 2027",
    description:
      "I am a B.Tech student in the Information Technology department at Jalpaiguri Government Engineering College (Autonomous). I had got 7.2 DGPA.",
    resultUrl: "https://drive.google.com/file/d/12zrDxno-YFq3RrKnvk2-TdJtauOabt5P/view?usp=sharing",
    align: "left",
  },
  {
    title: "Higher Secondary",
    period: "2020 - 2022",
    description:
      "I have done my Higher Secondary Education at Kotalpur High School in science with physics, chemistry, mathematics and biology, affiliated with the WBCHSE, with 372 out of 500 marks in the year of 2022.",
    resultUrl: "https://drive.google.com/file/d/14KT2z0JYxmaf2iPtcBrxO7hcE64aPLHc/view?usp=sharing",
    align: "right",
  },
  {
    title: "Secondary",
    period: "2015 - 2020",
    description:
      "I have done my Secondary Education at Balitha High School, affiliated with the West Bengal Council of Higher Secondary Education, with 647 out of 700 marks in the year of 2020",
    resultUrl: "https://drive.google.com/file/d/1lWRINT_aThbhnxO0rt8oOEtvua-4USuS/view?usp=sharing",
    align: "left",
  },
];

const AcademicTimeline = () => {
  return (
    <section className="relative flex flex-col items-center py-12">
      <div className="relative w-full max-w-5xl">
        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 h-full w-1 bg-white rounded-full" />

        {/* Timeline Items */}
        {timelineData.map((item, index) => {
          const AnimationWrapper =
            index % 2 === 0 ? SlideRightAnimation : SlideLeftAnimation;

          return (
            <AnimationWrapper
              key={index}
              className="relative mb-20 flex w-full items-center"
            >
              {/* Timeline Box */}
              <div
                className={`p-6 rounded-lg bg-purple-600 text-white shadow-lg 
                ml-auto w-10/12 sm:w-5/12
                ${item.align === "left" ? "sm:ml-0 sm:mr-auto" : "sm:ml-auto sm:mr-0"}
              `}
              >
                <h3 className="text-lg font-bold text-yellow-300">
                  {item.title}
                </h3>
                <p className="flex items-center text-sm text-gray-200 mt-1">
                  <Calendar size={16} className="mr-2" />
                  {item.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{item.description}</p>
                <span className="inline-block mt-4 px-3 py-1 rounded-md bg-green-400 text-black text-xs font-semibold">
                  <Button
                    onClick={
                      () => {
                        window.open(item.resultUrl)
                      }
                  }
                  >Result</Button>
                </span>
              </div>

              {/* Graduation Cap */}
              <SlideUpAnimation
                className="absolute left-4 sm:left-1/2 top-1/2 
                -translate-y-1/2 -translate-x-1/2
                bg-slate-200 w-12 h-12 sm:w-20 sm:h-20 
                rounded-full border-4 border-slate-950
                flex items-center justify-center shadow-lg"
              >
                <GraduationCap size={22} className="sm:size-40 text-black" />
              </SlideUpAnimation>
            </AnimationWrapper>
          );
        })}
      </div>
    </section>
  );
};

export default AcademicTimeline;
