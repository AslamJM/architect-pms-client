import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { routeTree } from './routeTree.gen'
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { useAuthContext } from './integrations/context/auth-context.tsx'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: TanStackQueryProvider.getContext().queryClient,
    is_authenticated: false,
    me: null,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const { me, is_authenticated, is_loading } = useAuthContext()

  if (is_loading) {
    return (
      <div className="flex item-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return <RouterProvider router={router} context={{ me, is_authenticated }} />
}
