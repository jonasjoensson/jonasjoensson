import type { LinkOptions } from "@tanstack/react-router"
import mortgageImage from "../assets/mortgage.jpg"
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
    href: "https://www.ikea.com/addon-app/skytta/web/latest/?uiPlatform=web&locale=en-GB#/"
  },
  {
    title: "Mortgage Calculator",
    description: "A simple mortgage calculator built with React.",
    imageUrl: mortgageImage,
    linkOptions: {
      to: "/mortgage-calculator"
    }
  }
]

const Portfolio = () => {
  return (
    <section id="portfolio" className="mt-20">
      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight">
          Projects
        </h2>
        <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => {
            return (
              <SmartLink
                key={project.title}
                href={project.href}
                linkOptions={project.linkOptions}
              >
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
