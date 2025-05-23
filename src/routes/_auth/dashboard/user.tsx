import { Outlet, createFileRoute } from '@tanstack/react-router'
import UserHeader from '@/components/header/user-header'

export const Route = createFileRoute('/_auth/dashboard/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  )
}
