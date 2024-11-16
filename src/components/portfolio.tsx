interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "SKYTTA | IKEA",
    description: "3D web app for design your own sliding doors.",
    imageUrl: "/src/assets/skytta.jpeg",
    link: "https://www.ikea.com/addon-app/skytta/web/latest/?uiPlatform=web&locale=en-GB#/",
  },
  {
    title: "Flying Camera Service | Sony",
    description: "Service for people to get filmed by a drone while skiing.",
    imageUrl: "/src/assets/flycam.jpg",
    link: "https://www.sony.com/",
  },
  {
    title: "Design system | Nets",
    description: "Help Nets to develop a design system.",
    imageUrl: "/src/assets/nets.png",
    link: "https://www.nets.eu/Innovation",
  },
  {
    title: "Portfolio",
    description: "Previous personal website.",
    imageUrl: "/src/assets/dkv.jpg",
    link: "https://jonasjoensson.github.io/#portfolio",
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
