import {
  BanknoteIcon,
  BookCheckIcon,
  BookX,
  Calendar1Icon,
  UserCog,
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { TableProject } from '@/types/project'
import { formatDate } from '@/lib/utils'

type Props = {
  project: TableProject
}

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() =>
        navigate({
          to: '/dashboard/admin/projects/$id',
          params: { id: project.id },
        })
      }
    >
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center  text-muted-foreground text-sm">
            <UserCog className="text-teal-800 w-4 h-4 mr-2" />{' '}
            {project.assigned_to.name}
          </div>
          <div className="flex items-center  text-muted-foreground text-sm">
            {project.is_completed ? (
              <BookCheckIcon className="text-green-800 w-4 h-4 mr-2" />
            ) : (
              <BookX className="text-red-500 w-4 h-4 mr-2" />
            )}
            {project.is_completed ? 'completed' : 'in progress'}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar1Icon className="text-teal-800 w-4 h-4 mr-2" />{' '}
            {formatDate(new Date(project.created_at))}
          </div>
          <div className="flex items-center  text-muted-foreground text-sm">
            {project.is_paid ? (
              <BanknoteIcon className="text-green-800 w-4 h-4 mr-2" />
            ) : (
              <BanknoteIcon className="text-red-500 w-4 h-4 mr-2" />
            )}
            {project.is_paid ? 'paid' : 'not paid'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
