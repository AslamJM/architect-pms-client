import { createFileRoute } from '@tanstack/react-router'
import { validateSearch } from '../admin/projects.index'
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton'
import ProjectsPagination from '@/components/projects-pagination'
import ProjectCard from '@/components/project/project-card'
import { usePMProjects } from '@/hooks/pm/use-pm-projects'

export const Route = createFileRoute('/_auth/dashboard/pm/projects/')({
  component: RouteComponent,
  validateSearch: validateSearch,
})

function RouteComponent() {
  const { data, isLoading } = usePMProjects()
  const navigate = Route.useNavigate()

  const setPage = (page: number) => {
    navigate({ search: (prev) => ({ ...prev, page }) })
  }

  return (
    <div className="space-y-4 p-8">
      <h5 className="text-lg font-semibold">Projects</h5>
      {isLoading && <ProjectsSkeleton />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.map((pr) => <ProjectCard project={pr} key={pr.id} />)}
      </div>
      <ProjectsPagination setPage={setPage} />
    </div>
  )
}
