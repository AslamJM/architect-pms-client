import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 flex flex-col gap-4 p-8 border-r-[1px] border-slate-600">
        <Link to="/dashboard/admin/projects" className="text-blue-500">
          Projects
        </Link>
        <Link to={'/dashboard/admin/users'} className="text-blue-500">
          Users
        </Link>
      </div>
      <div className="col-span-4">
        <Outlet />
      </div>
    </div>
  )
}
