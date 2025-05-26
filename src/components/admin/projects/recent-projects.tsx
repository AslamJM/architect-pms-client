import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useRecentProjectsAdmin } from '@/hooks/admin/use-admin-projects'
import ProjectListItem from '@/components/project/project-list-item'
import ProjectListSkeleton from '@/components/skeletons/project-list-skeleton'
import { Button } from '@/components/ui/button'

export default function RecentProjects() {
  const { isLoading, data } = useRecentProjectsAdmin()
  return (
    <div className="space-y-4">
      <Link to="/dashboard/admin/projects" className="block mb-4">
        <Button variant="ghost">
          <ChevronLeft className="w-4 h-4 mr-1" /> All Projects
        </Button>{' '}
      </Link>
      <h5 className="font-semibold">Recent Projects</h5>
      <div className="space-y-2">
        {isLoading && <ProjectListSkeleton />}
        {data && data.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No projects found. Create a new project to get started.
          </div>
        )}
        {data &&
          data.slice(0, 5).map((pr) => (
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
