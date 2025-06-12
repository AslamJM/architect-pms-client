import { createFileRoute, redirect, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { LoginInput } from '@/schema/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { inputDV, loginSchema } from '@/schema/auth'
import { Form } from '@/components/ui/form'
import FormText from '@/components/form/form-text'
import { login } from '@/api/auth'
import { useAuthContext } from '@/integrations/context/auth-context'
import { userpath } from '@/lib/utils'
import Logo from '@/components/header/logo'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  // beforeLoad: ({ context: { is_authenticated, me } }) => {
  //   if (is_authenticated && me) {
  //     throw redirect({
  //       to: `/dashboard/${userpath(me.role)}`,
  //     })
  //   }
  // },
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const { setAuth, setMe } = useAuthContext()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: inputDV,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (me) => {
      setMe(me)
      setAuth(true)
      const path = userpath(me.role)
      navigate({ to: `/dashboard/${path}` })
    },
    onError: (e) => {
      if (e.message === 'Unauthorized') {
        toast('Login Failed', {
          description: 'Username or Password is incorrect',
          closeButton: true,
          style: {
            color: 'red',
          },
        })
      } else {
        toast('Login Failed', {
          description: 'Server Error',
          closeButton: true,
        })
      }
    },
  })

  const handleLogin = (values: LoginInput) => {
    mutate(values)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-50 via-teal-100 to-white">
      <Card className="p-8 w-[500px]">
        <CardHeader>
          <Logo />
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleLogin)}
            >
              <FormText
                control={form.control}
                label="Username"
                name="username"
              />
              <FormText
                control={form.control}
                label="Password"
                name="password"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-teal-600 hover:bg-teal-800"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}{' '}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
