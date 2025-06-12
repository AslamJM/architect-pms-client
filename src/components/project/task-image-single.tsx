import { Loader2, Maximize2Icon, XIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import type { TaskImage } from '@/types/project'
import { useAbilty } from '@/hooks/use-ability'
import { deleteTaskImage } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  image: TaskImage
  taskId: string
}

export default function SingleTaskImage({ image, taskId }: Props) {
  const { canAddTasks } = useAbilty()

  const id = useProjectId()
  const { removeTaskImage } = useSingleProject(id)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskImage,
    onSuccess: () => {
      removeTaskImage(taskId, image.id)
    },
  })

  return (
    <div className="relative">
      <img
        src={image.url}
        className="w-[130px] h-[100px] object-cover rounded"
      />
      <div className="absolute top-0 right-0 p-1 z-10 flex items-center gap-2">
        <Button className="rounded-full w-6 h-6 cursor-pointer bg-teal-600 hover:bg-teal-800">
          <Maximize2Icon className="w-4 h-4" />
        </Button>
        {canAddTasks && (
          <Button
            className="rounded-full w-6 h-6 cursor-pointer bg-teal-600 hover:bg-teal-800"
            disabled={isPending}
            onClick={() => mutate(image.id)}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XIcon className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
