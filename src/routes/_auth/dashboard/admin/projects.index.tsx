import { Link, createFileRoute } from '@tanstack/react-router'
import { BookImageIcon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdminProjects } from '@/hooks/admin/use-admin-projects'
import ProjectCard from '@/components/project/project-card'
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/_auth/dashboard/admin/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useAdminProjects()
  return (
    <div className="space-y-6 p-8">
      <div className="flex item-center gap-8">
        <div className="flex items-center space-x-2">
          <BookImageIcon className="w-6 h-6 text-teal-700" />{' '}
          <h3 className="text-xl font-semibold">Projects</h3>
        </div>
        <div>
          <Link to="/dashboard/admin/projects/create">
            <Button>
              Create New Project <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Input placeholder="search project name" />
      </div>
      <div className="space-y-4">
        {isLoading && <ProjectsSkeleton />}
        {data && data.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No Projects were found.
          </div>
        )}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {data.map((pr) => (
              <ProjectCard key={pr.id} project={pr} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
