import { DotIcon, File, Image } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import type { RecentUpload } from '@/types/project'
import { useAbilty } from '@/hooks/use-ability'

type Props = {
  work: RecentUpload
}

export default function RecentWorkCard({ work }: Props) {
  const { isAdmin } = useAbilty()

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 rounded-full bg-muted ">
        {work.type === 'WORKING_FILES' ? (
          <File className="text-teal-800 w-4 h-4" />
        ) : (
          <Image className="text-blue-500 w-4 h-4" />
        )}
      </div>
      <span className="text-sm text-muted-foreground flex-5">
        {`${work.uploaded_by} submitted ${
          work.type === 'RENDERED_IMAGES' ? 'rendered images' : 'working files'
        } for the project `}
        <Link
          to={
            isAdmin
              ? '/dashboard/admin/projects/$id'
              : '/dashboard/pm/projects/$id'
          }
          params={{ id: work.project_id }}
          className="underline ml-1 hover:text-teal-900"
        >
          {work.project_name}
        </Link>
      </span>
      <div className="flex-2 flex items-center gap-1">
        <DotIcon className="w-4 h-4 text-teal-800" />
        <span className="text-sm">
          {formatDistanceToNow(new Date(work.uploaded_at), { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}
