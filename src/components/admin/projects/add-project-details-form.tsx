import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import type { CreateProjectDetailsInput } from '@/schema/project'
import { createProject } from '@/api/project'
import FormSelect from '@/components/form/form-select'
import FormText from '@/components/form/form-text'
import FormTextArea from '@/components/form/form-text-area'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useUsers } from '@/hooks/use-users'
import { createProjectDetailsSchema, projectDetailsDV } from '@/schema/project'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRecentProjectsAdmin } from '@/hooks/admin/use-admin-projects'

export default function AddProjectDetailsForm() {
  const form = useForm<CreateProjectDetailsInput>({
    resolver: zodResolver(createProjectDetailsSchema),
    defaultValues: projectDetailsDV,
  })
  const { isLoading, data } = useUsers()
  const { invalidate } = useRecentProjectsAdmin()

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      invalidate()
      form.reset()
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((values) => mutate(values))}
          >
            <FormText control={form.control} name="name" label="Project Name" />
            <FormTextArea
              control={form.control}
              name="description"
              label="Project Description"
            />
            <FormTextArea
              control={form.control}
              name="design_notes"
              label="Design Notes"
            />
            <FormSelect
              control={form.control}
              label="Assigned To"
              name="assigned_to_id"
              isLoading={isLoading}
              placeholder="Select User"
              data={
                data
                  ? data
                      .filter((d) => d.role === 'USER')
                      .map((d) => ({ label: d.name, value: d.id }))
                  : []
              }
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2" />}
              Create Project
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
