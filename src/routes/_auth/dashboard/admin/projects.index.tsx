import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/dashboard/admin/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6 p-8">
      <Link to="/dashboard/admin/projects/create">
        <Button variant="link">Create New Project</Button>
      </Link>
      <div>
        <h5>Projects</h5>
      </div>
    </div>
  )
}
