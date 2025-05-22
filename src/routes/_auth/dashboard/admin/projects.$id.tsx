import { createFileRoute } from '@tanstack/react-router'
import { TagIcon } from 'lucide-react'
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

      {data && (
        <div className="space-y-4 p-8">
          <div className="flex items-center space-x-2">
            <TagIcon className="w-6 h-6 text-teal-700" />{' '}
            <h3 className="text-xl font-semibold">{data.name}</h3>
          </div>
          <MainTabs />
        </div>
      )}
    </div>
  )
}
