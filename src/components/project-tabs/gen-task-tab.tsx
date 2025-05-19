import AddTask from '../project/add-task'
import TaskList from '../project/task-list'
import type { TaskType } from '@/types/project'

type Props = {
  type: TaskType
}

export default function GenericTaskTab({ type }: Props) {
  return (
    <div>
      <AddTask type={type} />
      <TaskList type={type} />
    </div>
  )
}
