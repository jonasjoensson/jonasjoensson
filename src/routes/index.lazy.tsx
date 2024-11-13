import Hero from "@/components/hero";
import Portfolio from "@/components/portfolio";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto mt-32 flex h-full w-full max-w-3xl flex-col items-start justify-start p-2">
      <Hero />
      <Portfolio />
    </div>
  );
}
