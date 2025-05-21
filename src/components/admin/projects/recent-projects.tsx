import { Link } from '@tanstack/react-router'
import { useAdminProjects } from '@/hooks/admin/use-admin-projects'
import ProjectListItem from '@/components/project/project-list-item'
import ProjectListSkeleton from '@/components/skeletons/project-list-skeleton'

export default function RecentProjects() {
  const { isLoading, data } = useAdminProjects()
  return (
    <div className="space-y-4">
      <h5 className="font-semi-bold">Recent Projects</h5>
      <div className="space-y-2">
        {isLoading && <ProjectListSkeleton />}
        {data && data.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No projects found. Create a new project to get started.
          </div>
        )}
        {data &&
          data.map((pr) => (
            <Link
              key={pr.id}
              to={'/dashboard/admin/projects/$id'}
              params={{ id: pr.id }}
              className="block"
            >
              <ProjectListItem project={pr} />
            </Link>
          ))}
      </div>
    </div>
  )
}
