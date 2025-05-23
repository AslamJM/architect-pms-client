import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import AdminHeader from '@/components/header/admin-header'
import { USER_HOME } from '@/lib/constants'

export const Route = createFileRoute('/_auth/dashboard/admin')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const { me } = context
    if (me && me.role === 'USER') {
      throw redirect({
        to: USER_HOME,
      })
    }
  },
})

function RouteComponent() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  )
}
