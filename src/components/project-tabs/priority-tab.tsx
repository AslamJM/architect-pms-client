import AddTask from '../project/add-task'
import TaskList from '../project/task-list'

export default function PriorityTab() {
  return (
    <div className="space-y-8">
      <AddTask type="PRIORITY" />
      <TaskList type="PRIORITY" />
    </div>
  )
}
