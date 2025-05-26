import { useMutation } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { deleteUpload } from '@/api/uploads'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  uploadId: string
}

export default function FileDeleteButton({ uploadId }: Props) {
  const id = useProjectId()
  const { invalidate } = useSingleProject(id)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUpload,
    onSuccess: () => {
      invalidate()
    },
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() => mutate(uploadId)}
          disabled={isPending}
        >
          <Trash2Icon className="w-4 h-4 text-red-600" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete this file</TooltipContent>
    </Tooltip>
  )
}
