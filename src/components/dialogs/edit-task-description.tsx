import { Edit2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Form } from '../ui/form'
import FormTextArea from '../form/form-text-area'
import { updateTask } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  taskId: string
  content: string
}

export default function EditTaskDescription({ taskId, content }: Props) {
  const [open, setOpen] = useState(false)

  const id = useProjectId()
  const { updateTaskInProject } = useSingleProject(id)

  const form = useForm({
    defaultValues: {
      content,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateTask,
    onError: (err) => {
      console.log(err)
    },
    onSuccess: () => {
      updateTaskInProject({ id: taskId, content: form.getValues('content') })
      setOpen(false)
    },
  })

  const submit = () => {
    const updated = form.getValues('content')
    mutate({
      id: taskId,
      data: {
        content: updated,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit2 className="w-4 h-4 text-orange-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit details</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormTextArea
              control={form.control}
              name="content"
              label="Description"
            />
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isPending}>
                Update
              </Button>
              <DialogClose>
                <Button variant="destructive" type="button">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
