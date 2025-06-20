import { useMutation } from '@tanstack/react-query'
import { Checkbox } from '../ui/checkbox'
import { SelectSeparator } from '../ui/select'
import DeleteTaskDg from '../dialogs/delete-task-dialog'
import EditTaskDescription from '../dialogs/edit-task-description'
import SingleTaskImage from './task-image-single'
import AddMoreImagesToTask from './add-more-images'
import type { Task } from '@/types/project'
import { useAbilty } from '@/hooks/use-ability'
import { updateTask } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  task: Task
}

export default function SingleTask({ task }: Props) {
  const { isUser, canAddTasks } = useAbilty()
  const projectId = useProjectId()
  const { updateTaskInProject } = useSingleProject(projectId)

  const { mutate, isPending } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      updateTaskInProject({ id: task.id, completed: !task.completed })
    },
  })

  const checkCompleted = () => {
    mutate({
      id: task.id,
      data: {
        completed: !task.completed,
      },
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Checkbox
          defaultChecked={task.completed}
          disabled={!isUser || isPending}
          onCheckedChange={checkCompleted}
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground">{task.content}</p>
        {!isUser && (
          <div className="flex items-center gap-2">
            <EditTaskDescription taskId={task.id} content={task.content} />
            <DeleteTaskDg taskId={task.id} />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {task.images.map((im) => (
          <SingleTaskImage image={im} key={im.id} taskId={task.id} />
        ))}
        {canAddTasks && <AddMoreImagesToTask taskId={task.id} />}
      </div>
      <SelectSeparator />
    </div>
  )
}
