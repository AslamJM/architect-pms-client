import { createFileRoute } from '@tanstack/react-router'
import { validateSearch } from '../admin/projects.index'

export const Route = createFileRoute('/_auth/dashboard/pm/projects')({
  component: RouteComponent,
  validateSearch: validateSearch,
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/pm/projects"!</div>
}
