import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: ({ context: { is_authenticated, me }, location }) => {
    if (!is_authenticated || !me) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  return (
    <div className="min-h-screen px-4 md:px-8 xl:px-16">
      <div>
        <Outlet />
      </div>
    </div>
  )
}
