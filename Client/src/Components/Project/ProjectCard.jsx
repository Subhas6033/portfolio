import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../index";
import { Image } from "../profileImage/Image";

const ProjectCard = ({
  imageURL,
  title,
  description,
  githubLink,
  liveLink,
}) => {
  return (
    <Card
      wrapperClassName="md:w-[400px]"
      padding="pt-5 px-3 pb-3"
      background="bg-white/25"
    >
      <Image
        imageURL={imageURL}
        wrapperClass="flex justify-center"
        className="h-60 md:w-96 rounded-md"
      />
      <div className="min-h-fit mt-5 w-full">
        <p className="mt-5 h-32 max-h-60">
          <strong>{title}</strong> {description}
        </p>
        <div className="mt-5 flex justify-end items-center">
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
  );
};

export default ProjectCard;