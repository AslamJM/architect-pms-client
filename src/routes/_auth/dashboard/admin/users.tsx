import { createFileRoute } from '@tanstack/react-router'
import AddUserForm from '@/components/admin/users/add-user-form'
import UsersList from '@/components/admin/users/user-list'

export const Route = createFileRoute('/_auth/dashboard/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      <AddUserForm />
      <UsersList />
    </div>
  )
}
