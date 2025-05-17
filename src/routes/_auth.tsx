import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { userpath } from '@/lib/utils'

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
    <div>
      <div className="p-4 bg-slate-100">
        <h2>Dashboard</h2>
      </div>
      <Outlet />
    </div>
  )
}
