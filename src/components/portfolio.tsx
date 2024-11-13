import { CardDescription, CardTitle } from "./ui/card";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "SKYTTA | IKEA",
    description: "Design your own sliding doors for any space",
    imageUrl:
      "https://www.ikea.com/ext/ingkadam/m/2a748b7ac33504a5/original/PE825311.jpg?f=xs",
    link: "https://www.ikea.com/addon-app/skytta/web/latest/?uiPlatform=web&locale=sv-SE#/",
  },
  {
    title: "Flying Camera Service | Sony",
    description: "Get filmed by a drone - without owning a drone",
    imageUrl:
      "https://jonasberglund.github.io/assets/images/portfolio/web_flycam.jpg",
    link: "https://ecotrack-app.com",
  },
  {
    title: "Design system | Nets",
    description: "Personal carbon footprint calculator",
    imageUrl:
      "https://cdn.myportfolio.com/76e3e5a5-99b9-4181-9c14-87d4204c9641/1316d6e4-6c2c-46a4-a7cb-f732825ceac9_rw_1920.png?h=3ddad01ffb0fff2717ca8aaccb3034e8",
    link: "https://www.nets.eu/Innovation",
  },
  {
    title: "Portfolio",
    description: "Prev personal website",
    imageUrl:
      "https://jonasberglund.github.io/assets/images/portfolio/app_dkv.jpg",
    link: "https://jonasberglund.github.io/#portfolio",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="mt-20">
      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight">
          Projects
        </h2>
        <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="flex gap-2">
              <div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </div>
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
