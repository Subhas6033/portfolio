import React from "react";
import { Card } from "../../Components/index";
import { SlideUpAnimation } from "../../utils/Animation";

const Achievements = () => {
  const achievements = [
    {
      title: "Open Source Contributor",
      description: "Contributed to multiple React and Tailwind CSS projects.",
      date: "2025",
    }
  ];

  return (
    <SlideUpAnimation>
      <div className="w-full min-h-screen flex justify-center items-center px-4 ">
        <Card
          wrapperClassName="max-w-3xl w-full"
          background="bg-white/10 backdrop-blur-lg"
          rounded="rounded-3xl"
          shadow="shadow-xl"
          padding="p-8"
        >
          <div className="space-y-6">
            {achievements.map((ach, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-4 last:border-none"
              >
                <h2 className="text-xl font-semibold text-white">
                  {ach.title}
                </h2>
                <p className="text-gray-300 mt-2">{ach.description}</p>
                <span className="text-sm text-gray-400">{ach.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SlideUpAnimation>
  );
};

export default Achievements;
