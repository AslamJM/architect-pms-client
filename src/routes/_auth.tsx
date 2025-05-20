import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useAuthContext } from '@/integrations/context/auth-context'
import { Button } from '@/components/ui/button'
import { logout } from '@/api/auth'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: ({ context: { is_authenticated, me }, location }) => {
    if (!is_authenticated || !me) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  const { me, setMe, setAuth } = useAuthContext()
  const navigate = Route.useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuth(false)
      setMe(null)
      navigate({ to: '/login' })
    },
  })

  return (
    <div>
      <div className="p-4 bg-slate-100 flex items-center justify-between gap-4">
        <h2>Dashboard</h2>
        <div className="flex gap-4">
          <p>{me?.name}</p>
          <Button onClick={() => mutate()} disabled={isPending}>
            Log Out
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
