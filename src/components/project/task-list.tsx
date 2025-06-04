import { Card, CardContent } from '../ui/card'
import SingleTask from './single-task'
import type { TaskType } from '@/types/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  type: TaskType
}

export default function TaskList({ type }: Props) {
  const id = useProjectId()
  const { data } = useSingleProject(id)

  const tasks = data && data.tasks.filter((t) => t.type === type)

  return (
    <Card>
      <CardContent className="space-y-4">
        {tasks && tasks.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No details were provided.
          </div>
        )}
        {tasks && tasks.map((task) => <SingleTask key={task.id} task={task} />)}
      </CardContent>
    </Card>
  )
}
