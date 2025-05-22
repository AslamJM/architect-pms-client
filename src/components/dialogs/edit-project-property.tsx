import { Edit2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
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
import { Form } from '../ui/form'
import FormText from '../form/form-text'
import FormTextArea from '../form/form-text-area'
import { updateProject } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  propertyName: 'name' | 'design_notes' | 'description'
  value: string
}

export default function EditProjectProperty({ propertyName, value }: Props) {
  const id = useProjectId()

  const { updateProject: update } = useSingleProject(id)

  const form = useForm({
    defaultValues: {
      [propertyName]: value,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      console.log('ok')

      update({
        [propertyName]: value,
      })
    },
  })

  const handleUpdate = () => {
    const input = {
      [propertyName]: form.getValues(propertyName),
    }

    mutate({
      id,
      data: input,
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Project Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            {propertyName === 'name' ? (
              <FormText
                name={propertyName}
                control={form.control}
                label="Name"
              />
            ) : (
              <FormTextArea
                name={propertyName}
                control={form.control}
                label={propertyName.split('_').join(' ')}
              />
            )}
            <DialogFooter className="mt-2">
              <Button type="submit" disabled={isPending}>
                Update
              </Button>
              <DialogClose>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
