import { Link, createFileRoute } from '@tanstack/react-router'
import { BookImageIcon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdminProjects } from '@/hooks/admin/use-admin-projects'
import ProjectCard from '@/components/project/project-card'
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton'
import { Input } from '@/components/ui/input'
import UserFilter from '@/components/filters/user-filter'
import ProjectsPagination from '@/components/projects-pagination'

export type ProjectSearch = {
  page?: number
  name?: string
  assigned_to?: string
}

export const validateSearch = (
  search: Record<string, unknown>,
): ProjectSearch => {
  return {
    page: search.page ? Number(search.page) : undefined,
    name: typeof search.name === 'string' ? search.name : undefined,
    assigned_to:
      typeof search.assigned_to === 'string' ? search.assigned_to : undefined,
  }
}

export const Route = createFileRoute('/_auth/dashboard/admin/projects/')({
  component: RouteComponent,
  validateSearch,
})

function RouteComponent() {
  const { data, isLoading, error } = useAdminProjects()
  const navigate = Route.useNavigate()

  const setAssignedTo = (id: string | undefined) => {
    navigate({
      search: (prev) => {
        return { ...prev, assigned_to: id }
      },
    })
  }

  const setPage = (page: number) => {
    navigate({
      search: (prev) => {
        return { ...prev, page: page }
      },
    })
  }

  return (
    <div className="space-y-4 p-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <Input
              placeholder="search project name"
              onChange={(e) =>
                navigate({
                  search: (prev) => ({ ...prev, name: e.target.value }),
                })
              }
            />
          </div>
          <UserFilter setAssignedTo={setAssignedTo} />
        </div>
      </div>
      <div className="space-y-4">
        {isLoading && <ProjectsSkeleton />}
        {error && (
          <div className="text-red-500 text-sm">
            An error occurred while fetching projects: {error.message}
          </div>
        )}
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
      <ProjectsPagination setPage={setPage} />
    </div>
  )
}
