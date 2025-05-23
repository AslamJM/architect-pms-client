import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, TagIcon } from 'lucide-react'
import { useSingleProject } from '@/hooks/use-single-project'
import MainTabs from '@/components/project-tabs/main-tabs'
import SingleProjectSkeleton from '@/components/skeletons/single-project-skeleton'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/dashboard/user/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data, isLoading } = useSingleProject(params.id)

  return (
    <div>
      <div>
        <Link to="/dashboard/user">
          <Button variant="link" size="lg">
            <ChevronLeft /> All Projects
          </Button>
        </Link>
      </div>
      {isLoading && <SingleProjectSkeleton />}

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
