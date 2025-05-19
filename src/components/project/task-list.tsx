import type { TaskType } from '@/types/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  type: TaskType
}

export default function TaskList({ type }: Props) {
  const id = useProjectId()
  const { data } = useSingleProject(id)

  return (
    <div className="space-y-4">
      {data &&
        data.tasks
          .filter((t) => t.type === type)
          .map((task) => (
            <div key={task.id}>
              <p>{task.content}</p>
              {task.images.map((im) => (
                <img src={im.url} key={im.id} />
              ))}
            </div>
          ))}
    </div>
  )
}
