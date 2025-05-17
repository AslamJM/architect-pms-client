import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_role')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.me) {
      throw redirect({
        to: '/login',
      })
    }
    const role = context.me.role
    const path =
      role === 'ADMIN' ? 'admin' : role === 'PROJECT_MANAGER' ? 'pm' : 'user'
    throw redirect({
      to: `/dashboard/${path}`,
    })
  },
})

function RouteComponent() {
  return <Outlet />
}
