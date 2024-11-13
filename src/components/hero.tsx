import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="mt-16 md:mt-32">
      <img
        src="https://utfs.io/f/sF52B4cUzCgZK36OPc7iMF8amXvsCdSD10ZuY3p4OTzbqRBt"
        alt="Jonas Jönsson"
        className="h-64 w-64 rounded-xl"
      />
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
        Jonas Jönsson
      </h1>
      <p className="text-l mb-2">Senior Web Developer | Malmö, Sweden</p>
      <div className="flex gap-2">
        <Button variant="default" size="sm" asChild>
          <a href="https://github.com/jonasberglund">
            <GitHubLogoIcon /> Github
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://www.linkedin.com/in/jonasjoensson/">
            <LinkedInLogoIcon /> LinkedIn
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
