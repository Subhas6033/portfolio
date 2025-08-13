import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../index";
import { Image } from "../profileImage/Image";
import { SlideUpAnimation } from "../../utils/Animation";

const ProjectCard = ({
  imageURL,
  title,
  description,
  githubLink,
  liveLink,
}) => {
  return (
    <SlideUpAnimation>
      <Card
        wrapperClassName="md:w-[400px]"
        padding="pt-5 px-3 pb-3"
        background="bg-white/25"
      >
        {/* Project images goes here */}
        <Image
          imageURL={imageURL}
          wrapperClass="flex justify-center"
          className="h-60 md:w-96 rounded-md"
        />

        {/* Project title and descriptions goes here */}
        <div className="min-h-fit my-5 w-full ">
          <p className="mt-5 h-32 max-h-60">
            <strong>{title}</strong> {description}
          </p>

          {/* Project links and github links goes here */}
          <div className="mt-14 md:mt-5 flex justify-end items-center">
            <ul className="flex justify-between gap-6">
              <li>
                <Link to={githubLink} target="_blank">
                  <Image
                    imageURL={"./Skill/github2.png"}
                    className="h-10 w-10 text-black"
                  />
                </Link>
              </li>
              <li>
                <Link to={liveLink} target="_blank">
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
    </SlideUpAnimation>
  );
};

export default ProjectCard;