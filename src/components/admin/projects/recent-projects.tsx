import { Link } from '@tanstack/react-router'
import { useAdminProjects } from '@/hooks/admin/use-admin-projects'

export default function RecentProjects() {
  const { isLoading, data } = useAdminProjects()
  return (
    <div className="space-y-4">
      <h5>Recent Projects</h5>
      <div className="space-y-2">
        {isLoading && <p>Loading....</p>}
        {data &&
          data.map((pr) => (
            <Link
              key={pr.id}
              to={'/dashboard/admin/projects/$id'}
              params={{ id: pr.id }}
              className="block"
            >
              {pr.name}
            </Link>
          ))}
      </div>
    </div>
  )
}
