import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAdminProjects } from '@/hooks/admin/use-admin-projects'

export const Route = createFileRoute('/_auth/dashboard/admin/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useAdminProjects()
  return (
    <div className="space-y-6 p-8">
      <Link to="/dashboard/admin/projects/create">
        <Button variant="link">Create New Project</Button>
      </Link>
      <div className="space-y-4">
        <h5>Projects</h5>
        {isLoading && <p>Loading...</p>}
        {data && (
          <div className="grid grid-cols-4 gap-4">
            {data.map((pr) => (
              <div key={pr.id} className="bg-muted p-4">
                <h6>{pr.name}</h6>
                <p>{pr.assined_to}</p>
                <p>{new Date(pr.created_at).toDateString()}</p>
                <Link
                  to="/dashboard/admin/projects/$id"
                  params={{ id: pr.id }}
                  className="text-blue-600"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
