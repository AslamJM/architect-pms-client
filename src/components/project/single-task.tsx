import { Checkbox } from '../ui/checkbox'
import { SelectSeparator } from '../ui/select'
import type { Task } from '@/types/project'

type Props = {
  task: Task
}

export default function SingleTask({ task }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Checkbox defaultChecked={task.completed} />
        <p className="text-sm text-muted-foreground">{task.content}</p>
      </div>
      <div className="flex gap-2">
        {task.images.map((im) => (
          <img
            src={im.url}
            key={im.id}
            className="w-[100px] h-[100px] object-cover rounded"
          />
        ))}
      </div>
      <SelectSeparator />
    </div>
  )
}
