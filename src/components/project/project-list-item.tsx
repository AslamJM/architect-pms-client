import { Calendar1, UserIcon } from 'lucide-react'
import type { TableProject } from '@/types/project'
import { formatDate } from '@/lib/utils'

type Props = {
  project: TableProject
}

export default function ProjectListItem({ project }: Props) {
  return (
    <div className="space-y-1 hover:bg-teal-50 rounded py-2 border-[1px] border-teal-500 px-2">
      <div className="text-sm">{project.name}</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <UserIcon className="w-4 h-4 mr-2 text-teal-700" />
          {project.assigned_to.name}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar1 className="w-4 h-4 mr-2 text-teal-700" />
          {formatDate(new Date(project.created_at))}
        </div>
      </div>
    </div>
  )
}
