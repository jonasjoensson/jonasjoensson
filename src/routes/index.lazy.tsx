import { createLazyFileRoute } from "@tanstack/react-router"
import Hero from "@/components/hero"
import Portfolio from "@/components/portfolio"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-start justify-start p-2">
      <Hero />
      <Portfolio />
    </div>
  )
}
