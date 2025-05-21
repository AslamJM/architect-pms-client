import { Outlet, createFileRoute } from '@tanstack/react-router'
import AdminHeader from '@/components/header/admin-header'

export const Route = createFileRoute('/_auth/dashboard/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  )
}
