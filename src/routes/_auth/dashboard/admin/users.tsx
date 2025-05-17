import { createFileRoute } from '@tanstack/react-router'
import AddUserForm from '@/components/admin/users/add-user-form'

export const Route = createFileRoute('/_auth/dashboard/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex p-8">
      <AddUserForm />
    </div>
  )
}
