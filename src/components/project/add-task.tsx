import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Form } from '../ui/form'
import FormTextArea from '../form/form-text-area'
import { Button } from '../ui/button'
import type { TaskType } from '@/types/project'
import type { CreateTaskInput } from '@/schema/project'
import { createTaskSchema } from '@/schema/project'
import { addTask } from '@/api/project'
import { useSingleProject } from '@/hooks/use-single-project'
import { useProjectId } from '@/hooks/use-project-id'

type Props = {
  type: TaskType
}

export default function AddTask({ type }: Props) {
  const prid = useProjectId()

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      content: '',
      image_urls: ['https://picsum.photos/200', 'https://picsum.photos/200'],
      type,
      completed: false,
    },
  })

  const { invalidate } = useSingleProject(prid)

  const { mutate, isPending } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      form.reset()
      invalidate()
    },
  })

  const onSubmit = (values: CreateTaskInput) => {
    mutate({
      projectId: prid,
      data: values,
    })
  }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormTextArea control={form.control} label="Details" name="content" />
          <div>Image Upload Field Here....</div>
          <Button type="submit" disabled={isPending}>
            Add
          </Button>
        </form>
      </Form>
    </div>
  )
}
