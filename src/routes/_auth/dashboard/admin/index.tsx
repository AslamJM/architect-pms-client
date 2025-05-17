import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex">ADMIN DASHBOARD HOME</div>
}
