import { createFileRoute } from '@tanstack/react-router'

import AddProjectDetailsForm from '@/components/admin/projects/add-project-details-form'
import RecentProjects from '@/components/admin/projects/recent-projects'

export const Route = createFileRoute('/_auth/dashboard/admin/projects/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid gap-4 grid-cols-3 p-8">
      <div className="col-span-1 p-4">
        <RecentProjects />
      </div>
      <div className="col-span-2 p-4">
        <AddProjectDetailsForm />
      </div>
    </div>
  )
}
