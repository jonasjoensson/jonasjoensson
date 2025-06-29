import { createRootRoute, Outlet } from "@tanstack/react-router"
import { Analytics } from "@vercel/analytics/react"

export const Route = createRootRoute({
  component: () => (
    <>
      <main>
        <Outlet />
        <Analytics />
      </main>
      {/* <TanStackRouterDevtools /> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  ),
})
