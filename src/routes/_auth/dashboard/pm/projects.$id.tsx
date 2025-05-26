import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/pm/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/pm/projects/$id"!</div>
}
