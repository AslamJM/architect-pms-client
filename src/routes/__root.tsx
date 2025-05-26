import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanStackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import type { Me } from '@/types/user'
import { TooltipProvider } from '@/components/ui/tooltip'

interface MyRouterContext {
  queryClient: QueryClient
  is_authenticated: boolean
  me: Me | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <TooltipProvider>
        <Outlet />
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </TooltipProvider>
    </>
  ),
})
