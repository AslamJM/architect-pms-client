import { Link, createFileRoute } from '@tanstack/react-router'
import { useUserProjects } from '@/hooks/user/use-user-projects'

export const Route = createFileRoute('/_auth/dashboard/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useUserProjects()
  return (
    <div className="space-y-4 p-8">
      <h5>My Project</h5>
      <div>
        {isLoading && <p>Loading....</p>}
        {data &&
          data.map((pr) => (
            <div>
              <Link
                to="/dashboard/admin/projects/$id"
                params={{ id: pr.id }}
                key={pr.id}
              >
                {pr.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
