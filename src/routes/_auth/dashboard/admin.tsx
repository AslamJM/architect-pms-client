import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex">
      <div className="w-[300px] flex flex-col gap-4 p-8 border-r-[1px] border-slate-600">
        <Link to="/dashboard/admin/projects" className="text-blue-500">
          Projects
        </Link>
        <Link to={'/dashboard/admin/users'} className="text-blue-500">
          Users
        </Link>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}
