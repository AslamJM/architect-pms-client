import { format } from 'date-fns'
import { DownloadIcon, FileIcon } from 'lucide-react'
import { Button } from '../ui/button'
import type { Upload } from '@/types/project'
import { getFileNameFromUrl } from '@/lib/mock'

type Props = {
  upload: Upload
}

export default function SingleWorkFile({ upload }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-full bg-muted">
        <FileIcon />
      </div>
      <div>
        <p>{getFileNameFromUrl(upload.url)}</p>
        <p className="text-sm text-muted-foreground">
          {format(upload.uploaded_at, 'dd-MM-yyyy hh:mm a')}
        </p>
      </div>
      <div className="ml-2">
        <Button size="icon" variant="ghost" className="rounded-full">
          <DownloadIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
