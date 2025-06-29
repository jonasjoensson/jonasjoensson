import type { LinkOptions } from "@tanstack/react-router"
import { Home } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import dkvImage from "../assets/dkv.jpg"
import flycamImage from "../assets/flycam.jpg"
import netsImage from "../assets/nets.png"
import skyttaImage from "../assets/skytta.jpeg"
import { SmartLink } from "./smart-link"

type Project = {
  title: string
  description: string
  imageUrl?: string
  icon?: React.ComponentType<{ className?: string; size?: string | number }>
  href?: string
  linkOptions?: LinkOptions
  hidden?: boolean
}

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
    linkOptions: {
      to: "/mortgage-calculator",
    },
    icon: Home,
    hidden: true, // This project is hidden
  },
]

const Portfolio = () => {
  const [showHidden] = useQueryState(
    "showHidden",
    parseAsBoolean.withDefault(false),
  )

  return (
    <section id="portfolio" className="mt-20">
      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight">
          Projects
        </h2>
        <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => {
            if (project.hidden && !showHidden) {
              return null // Skip hidden projects
            }

            return (
              <SmartLink linkOptions={project.linkOptions} key={project.title}>
                <div className="flex gap-2">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
                  {project.icon && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg">
                      <project.icon className="text-blue-600" size={32} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold">{project.title}</h3>
                    <p className="font-mono text-xs leading-none">
                      {project.description}
                    </p>
                  </div>
                </div>
              </SmartLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
