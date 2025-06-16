import { LinkOptions } from "@tanstack/react-router";
import dkvImage from "../assets/dkv.jpg";
import flycamImage from "../assets/flycam.jpg";
import netsImage from "../assets/nets.png";
import skyttaImage from "../assets/skytta.jpeg";
import placeholder from "../assets/jonas.jpeg";
import { parseAsBoolean, useQueryState } from "nuqs";
import { SmartLink } from "./smart-link";

type Project = {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
  linkOptions?: LinkOptions;
  hidden?: boolean;
};

const projects: Project[] = [
  {
    title: "SKYTTA | IKEA",
    description: "3D web app for design your own sliding doors.",
    imageUrl: skyttaImage,
    href: "https://www.ikea.com/addon-app/skytta/web/latest/?uiPlatform=web&locale=en-GB#/",
  },
  {
    title: "Flying Camera Service | Sony",
    description: "Service for people to get filmed by a drone while skiing.",
    imageUrl: flycamImage,
    href: "https://www.sony.com/",
  },
  {
    title: "Design system | Nets",
    description: "Help Nets to develop a design system.",
    imageUrl: netsImage,
    href: "https://www.nets.eu/Innovation",
  },
  {
    title: "Portfolio",
    description: "Previous personal website.",
    imageUrl: dkvImage,
    href: "https://jonasjoensson.github.io/#portfolio",
  },
  {
    title: "Mortgage Calculator",
    description: "A simple mortgage calculator built with React.",
    imageUrl: placeholder,
    linkOptions: {
      to: "/mortgage-calculator",
    },
    hidden: true, // This project is hidden
  },
];

const Portfolio = () => {
  const [showHidden] = useQueryState(
    "showHidden",
    parseAsBoolean.withDefault(false)
  );

  return (
    <section id="portfolio" className="mt-20">
      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight">
          Projects
        </h2>
        <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => {
            if (project.hidden && !showHidden) {
              return null; // Skip hidden projects
            }

            return (
              <SmartLink linkOptions={project.linkOptions} key={project.title}>
                <div className="flex gap-2">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold">{project.title}</h3>
                    <p className="font-mono text-xs leading-none">
                      {project.description}
                    </p>
                  </div>
                </div>
              </SmartLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
