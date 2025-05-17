import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_role/dashboard/user"!</div>
}
