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

  return (
    <Card>
      <CardContent className="space-y-4">
        {data &&
          data.tasks
            .filter((t) => t.type === type)
            .map((task) => <SingleTask key={task.id} task={task} />)}
      </CardContent>
    </Card>
  )
}
