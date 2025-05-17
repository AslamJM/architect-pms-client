import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import FormText from '@/components/form/form-text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { createUserSchema, userDV } from '@/schema/user'
import { Button } from '@/components/ui/button'
import FormSelect from '@/components/form/form-select'
import { createUser } from '@/api/user'

function AddUserForm() {
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: userDV,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      form.reset()
      console.log('User created successfully', data)
    },
  })

  return (
    <Card className="p-8 w-[400px]">
      <CardHeader>
        <CardTitle>Add User</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) => mutate(data))}
          >
            <FormText control={form.control} name="name" label="Name" />
            <FormText control={form.control} name="username" label="Username" />
            <FormText control={form.control} name="password" label="Password" />
            <FormSelect
              control={form.control}
              name="role"
              label="Role"
              placeholder="Select Role"
              data={[
                { label: 'Project Manager', value: 'PROJECT_MANAGER' },
                { label: 'User', value: 'USER' },
              ]}
            />
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddUserForm
