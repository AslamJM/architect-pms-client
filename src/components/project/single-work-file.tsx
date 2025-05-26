import { format } from 'date-fns'
import { FileIcon } from 'lucide-react'

import DownloadButton from './download-btn'
import FileDeleteButton from './file-delete-button'
import type { Upload } from '@/types/project'
import { getFileNameFromUrl } from '@/lib/mock'
import { useAbilty } from '@/hooks/use-ability'

type Props = {
  upload: Upload
}

export default function SingleWorkFile({ upload }: Props) {
  const { canAddTasks, isUser } = useAbilty()

  const delBtnShow =
    (upload.type === 'UPLOADED_FILES' && canAddTasks) ||
    (upload.type === 'WORKING_FILES' && isUser)

  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-full bg-muted">
        <FileIcon className="text-teal-700" />
      </div>
      <div>
        <p className="text-sm">{getFileNameFromUrl(upload.url)}</p>
        <p className="text-[12px] text-muted-foreground">
          {format(upload.uploaded_at, 'dd-MM-yyyy hh:mm a')}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <DownloadButton url={upload.url} />

        {delBtnShow && <FileDeleteButton uploadId={upload.id} />}
      </div>
    </div>
  )
}
