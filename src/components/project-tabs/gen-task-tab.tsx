import AddTask from '../project/add-task'
import TaskList from '../project/task-list'
import type { TaskType } from '@/types/project'
import { useAbilty } from '@/hooks/use-ability'

type Props = {
  type: TaskType
}

export default function GenericTaskTab({ type }: Props) {
  const { canAddTasks } = useAbilty()
  return (
    <div>
      {canAddTasks && <AddTask type={type} />}
      <TaskList type={type} />
    </div>
  )
}
