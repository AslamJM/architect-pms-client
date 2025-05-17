import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex">
      <div className="w-[500px] p-8">
        <Link to={'/dashboard/admin/users'} className="text-blue-500">
          Users
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
