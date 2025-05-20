import { createFileRoute } from '@tanstack/react-router'
import { useSingleProject } from '@/hooks/use-single-project'
import MainTabs from '@/components/project-tabs/main-tabs'

export const Route = createFileRoute('/_auth/dashboard/admin/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data, isLoading } = useSingleProject(params.id)
  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {data && <MainTabs />}
    </div>
  )
}
