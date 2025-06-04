import { createFileRoute } from '@tanstack/react-router'
import RecentProjectsAdminDashboard from '@/components/admin/dashboard/recent-projects'
import RecentUploads from '@/components/admin/dashboard/recent-uploads'

export const Route = createFileRoute('/_auth/dashboard/pm/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold mt-2">DASHBOARD</h3>
      <div className="grid grid-cols-2 gap-4">
        <RecentProjectsAdminDashboard />
        <RecentUploads />
      </div>
    </div>
  )
}
