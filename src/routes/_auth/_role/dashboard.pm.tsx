import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_role/dashboard/pm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_role/dashboard/pm"!</div>
}
