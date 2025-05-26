import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { User } from '@/types/user'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { updateUserSchema } from '@/schema/user'
import { Form } from '@/components/ui/form'
import FormText from '@/components/form/form-text'
import FormSelect from '@/components/form/form-select'
import { Button } from '@/components/ui/button'
import { updateUser } from '@/api/user'
import { useUsers } from '@/hooks/use-users'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: User
}

export default function EditUserDialog({ open, setOpen, data }: Props) {
  const { invalidate } = useUsers()

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: data.username,
      name: data.name,
      role: data.role as 'USER' | 'PROJECT_MANAGER',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateUser(data.id, form.getValues()),
    onSuccess: () => {
      setOpen(false)
      form.reset()
      invalidate()
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(() => mutate())}
          >
            <FormText control={form.control} name="name" label="Name" />
            <FormText control={form.control} name="username" label="Username" />
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
            <DialogFooter className="gap-4">
              <Button type="submit" disabled={isPending}>
                Save
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
