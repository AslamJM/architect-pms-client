import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { validateSearch } from '../admin/projects.index'
import { useUserProjects } from '@/hooks/user/use-user-projects'
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton'
import ProjectCard from '@/components/project/project-card'
import ProjectsPagination from '@/components/projects-pagination'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce-value'

export const Route = createFileRoute('/_auth/dashboard/user/')({
  component: RouteComponent,
  validateSearch: validateSearch,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useUserProjects()
  const navigate = Route.useNavigate()

  const setPage = (page: number) => {
    navigate({ search: (prev) => ({ ...prev, page }) })
  }

  const { debounced } = useDebounce(search)

  useEffect(() => {
    navigate({ search: (prev) => ({ ...prev, name: debounced }) })
  }, [])

  return (
    <div className="space-y-4 p-8">
      <h5 className="text-lg font-semibold">Projects</h5>
      <div>
        <Input
          placeholder="Search"
          className="w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading && <ProjectsSkeleton />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.map((pr) => <ProjectCard project={pr} key={pr.id} />)}
      </div>
      <ProjectsPagination setPage={setPage} />
    </div>
  )
}
