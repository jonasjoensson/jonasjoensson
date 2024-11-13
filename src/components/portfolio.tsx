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
    description:
      "Created an app for people to get filmed by a drone - without owning a drone",
    imageUrl:
      "https://jonasberglund.github.io/assets/images/portfolio/web_flycam.jpg",
    link: "https://www.sony.com/",
  },
  {
    title: "Design system | Nets",
    description: "Help Nets to develop a design system",
    imageUrl:
      "https://utfs.io/f/sF52B4cUzCgZjMqzV4eBajpzrHYfMhTOX37UlWGo45It2Z0m",
    link: "https://www.nets.eu/Innovation",
  },
  {
    title: "Portfolio",
    description: "Previous personal website",
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
            <a key={project.title} href={project.link} target="_blank">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
