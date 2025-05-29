import { createFileRoute } from '@tanstack/react-router'
import { TagIcon } from 'lucide-react'
import EditProjectProperty from '@/components/dialogs/edit-project-property'
import MainTabs from '@/components/project-tabs/main-tabs'
import SingleProjectSkeleton from '@/components/skeletons/single-project-skeleton'
import { useAbilty } from '@/hooks/use-ability'
import { useSingleProject } from '@/hooks/use-single-project'

export const Route = createFileRoute('/_auth/dashboard/pm/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data, isLoading } = useSingleProject(params.id)
  const { canAddTasks } = useAbilty()

  return (
    <div>
      {isLoading && <SingleProjectSkeleton />}

      {data && (
        <div className="space-y-4 p-8">
          <div className="flex items-center space-x-2">
            <TagIcon className="w-6 h-6 text-teal-700" />{' '}
            <h3 className="text-xl font-semibold">{data.name}</h3>
            {canAddTasks && (
              <EditProjectProperty propertyName="name" value={data.name} />
            )}
          </div>
          <MainTabs />
        </div>
      )}
    </div>
  )
}
