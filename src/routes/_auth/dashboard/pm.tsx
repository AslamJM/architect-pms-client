import { Outlet, createFileRoute } from '@tanstack/react-router'
import PMheader from '@/components/header/pm-header'

export const Route = createFileRoute('/_auth/dashboard/pm')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <PMheader />
      <Outlet />
    </div>
  )
}
