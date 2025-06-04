import { createFileRoute } from '@tanstack/react-router'
import AdminCounts from '@/components/admin/dashboard/counts'
import RecentUploads from '@/components/admin/dashboard/recent-uploads'
import RecentProjectsAdminDashboard from '@/components/admin/dashboard/recent-projects'

export const Route = createFileRoute('/_auth/dashboard/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-xl font-semibold uppercase">Admin Dashboard</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <AdminCounts />
          <RecentUploads />
        </div>
        <div>
          <RecentProjectsAdminDashboard />
        </div>
      </div>
    </div>
  )
}
