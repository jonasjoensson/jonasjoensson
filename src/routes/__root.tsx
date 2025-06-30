import { createRootRoute, Outlet } from "@tanstack/react-router"
import { Analytics } from "@vercel/analytics/react"
import { ModeToggle } from "@/components/mode-toggle"

export const Route = createRootRoute({
  component: () => (
    <>
      <ModeToggle />
      <main>
        <Outlet />
        <Analytics />
      </main>
      {/* <TanStackRouterDevtools /> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  )
})
