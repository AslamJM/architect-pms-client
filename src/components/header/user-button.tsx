import { LogOutIcon, User2Icon } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import Spinner from '../spinner'
import { useAuthContext } from '@/integrations/context/auth-context'
import { logout } from '@/api/auth'

export default function UserButton() {
  const { me, setAuth, setMe } = useAuthContext()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuth(false)
      setMe(null)
      navigate({ to: '/login' })
    },
  })
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <User2Icon className="w-4 h-4" />
        {me?.name}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => mutate()}
      >
        {isPending ? <Spinner /> : <LogOutIcon className="w-6 h-6" />}
      </Button>
    </div>
  )
}
