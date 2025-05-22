import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Form } from '../ui/form'
import FormTextArea from '../form/form-text-area'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import TaskImageUpload from './task-image-upload'
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
  const [urls, setUrls] = useState<Array<string>>([])

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      content: '',
      image_urls: urls,
      type,
      completed: false,
    },
  })

  const { invalidate } = useSingleProject(prid)

  const { mutate, isPending } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      form.reset()
      setUrls([])
      invalidate()
    },
  })

  const onSubmit = (values: CreateTaskInput) => {
    mutate({
      projectId: prid,
      data: {
        ...values,
        image_urls: urls,
      },
    })
  }

  return (
    <Card>
      <CardContent className="px-8">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormTextArea
              control={form.control}
              label="Details"
              name="content"
            />
            <TaskImageUpload urls={urls} setUrls={setUrls} />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Add
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
