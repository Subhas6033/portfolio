import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { Button, Card } from "../index";
import { Image } from "../profileImage/Image";
import { PopUpAnimation, SlideUpAnimation } from "../../utils/Animation";

const Project = () => {
  const navigate = useNavigate();

  return (
    <SlideUpAnimation className="mt-5 px-2 overflow-x-hidden">
      <PopUpAnimation className="text-center mt-5 mb-10">
        <p className="text-5xl font-orbitron font-medium text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-amber-600">
          Project
        </p>
      </PopUpAnimation>
      <div className="flex flex-col w-full md:flex-row justify-center items-center gap-10">
        {/* First Project */}
        <Card
          wrapperClassName="md:w-[400px]"
          padding="pt-5 px-3 pb-3"
          background="bg-white/25"
        >
          <Image
            imageURL={"./Projects/EV.jpeg"}
            wrapperClass="flex justify-center"
            className="h-60 md:w-96 rounded-md"
          />
          <div className="h-fit mt-5 w-full">
            <p>
              <strong>Electric Vehicle Dashboard</strong> is a React-based web
              application that allows users to explore detailed information
              about electric vehicles. Users can view specifications, track
              vehicle data, and explore manufacturing history based on selected
              years for deeper insights.
            </p>
            <div className="mt-5 flex justify-end items-center">
              <ul className="flex justify-between gap-6">
                <li>
                  <Link
                    to={
                      "https://github.com/Subhas6033/Electric-Vehicle-Dashboard"
                    }
                    target="_blank"
                  >
                    <Image
                      imageURL={"./Skill/github2.png"}
                      className="h-10 w-10 text-black"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"https://ev-eosin.vercel.app/"} target="_blank">
                    <Image
                      imageURL={"./Projects/Website.webp"}
                      className="h-10 w-10"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Second Project */}
        <Card
          wrapperClassName="md:w-[400px]"
          padding="pt-5 px-3 pb-3"
          background="bg-white/25"
        >
          <Image
            imageURL={"./Projects/EV.jpeg"}
            wrapperClass="flex justify-center"
            className="h-60 md:w-96 rounded-md"
          />
          <div className="h-fit mt-5 w-full">
            <p>
              <strong>Electric Vehicle Dashboard</strong> is a React-based web
              application that allows users to explore detailed information
              about electric vehicles. Users can view specifications, track
              vehicle data, and explore manufacturing history based on selected
              years for deeper insights.
            </p>
            <div className="mt-5 flex justify-end items-center">
              <ul className="flex justify-between gap-6">
                <li>
                  <Link
                    to={
                      "https://github.com/Subhas6033/Electric-Vehicle-Dashboard"
                    }
                    target="_blank"
                  >
                    <Image
                      imageURL={"./Skill/github2.png"}
                      className="h-10 w-10 text-black"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"https://ev-eosin.vercel.app/"} target="_blank">
                    <Image
                      imageURL={"./Projects/Website.webp"}
                      className="h-10 w-10"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Third Project */}
        <Card
          wrapperClassName="md:w-[400px]"
          padding="pt-5 px-3 pb-3"
          background="bg-white/25"
        >
          <Image
            imageURL={"./Projects/EV.jpeg"}
            wrapperClass="flex justify-center"
            className="h-60 md:w-96 rounded-md"
          />
          <div className="h-fit mt-5 w-full">
            <p>
              <strong>Electric Vehicle Dashboard</strong> is a React-based web
              application that allows users to explore detailed information
              about electric vehicles. Users can view specifications, track
              vehicle data, and explore manufacturing history based on selected
              years for deeper insights.
            </p>
            <div className="mt-5 flex justify-end items-center">
              <ul className="flex justify-between gap-6">
                <li>
                  <Link
                    to={
                      "https://github.com/Subhas6033/Electric-Vehicle-Dashboard"
                    }
                    target="_blank"
                  >
                    <Image
                      imageURL={"./Skill/github2.png"}
                      className="h-10 w-10 text-black"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"https://ev-eosin.vercel.app/"} target="_blank">
                    <Image
                      imageURL={"./Projects/Website.webp"}
                      className="h-10 w-10"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <PopUpAnimation className="mt-10 mb-20 flex justify-center items-center">
        <Button
          wrapperClass="bg-gray-950/90 border px-5 py-3 text-black rounded-lg"
          className="hover:cursor-pointer text-slate-200 text-lg font-gothic flex justify-center items-center gap-3"
          onClick={() => navigate("/projects")}
        >
          View More <FaArrowCircleRight />
        </Button>
      </PopUpAnimation>
    </SlideUpAnimation>
  );
};

export default Project;
