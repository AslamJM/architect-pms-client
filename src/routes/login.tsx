import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoginInput } from '@/schema/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { inputDV, loginSchema } from '@/schema/auth'
import { Form } from '@/components/ui/form'
import FormText from '@/components/form/form-text'
import { login } from '@/api/auth'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: inputDV,
  })

  const handleLogin = async (values: LoginInput) => {
    try {
      const me = await login(values)
      console.log(me)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-8 w-[600px]">
        <CardHeader>
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
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
