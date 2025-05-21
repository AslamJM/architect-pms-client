import { UserIcon } from 'lucide-react'
import type { TableProject } from '@/types/project'

type Props = {
  project: TableProject
}

export default function ProjectListItem({ project }: Props) {
  return (
    <div className="space-y-1 hover:bg-teal-50 rounded py-1 px-2">
      <div className="text-sm">{project.name}</div>
      <div className="flex items-center text-sm text-muted-foreground">
        <UserIcon className="w-4 h-4 mr-2 text-teal-700" />
        {project.assigned_to.name}
      </div>
    </div>
  )
}
