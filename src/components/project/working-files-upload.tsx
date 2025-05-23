import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import SingleWorkFile from './single-work-file'
import DropzoneField from './dropzone-field'
import type { UploadType } from '@/types/project'
import type React from 'react'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { useAbilty } from '@/hooks/use-ability'
import { uploadForPhase } from '@/api/uploads'

type Props = {
  phase_no: number
  type: UploadType
}

export default function WorkingFileUploads({ phase_no, type }: Props) {
  const [urls, setUrls] = useState<Array<string>>([])

  const id = useProjectId()
  const { data, invalidate } = useSingleProject(id)
  const { isUser } = useAbilty()

  const phase = data?.phases.find((p) => p.phase_number === phase_no)
  const { mutate } = useMutation({
    mutationFn: uploadForPhase,
    onSuccess: () => {
      invalidate()
    },
  })

  const hadleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const url = files[0].name

    mutate({
      projectId: id,
      data: {
        phase_number: phase_no,
        type,
        url: `https://server/working-files/${url}`,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {phase &&
          phase.uploads
            .filter((u) => u.type === type)
            .map((up) => <SingleWorkFile key={up.id} upload={up} />)}
      </div>
      {isUser && <DropzoneField urls={urls} setUrls={setUrls} type={type} />}
    </div>
  )
}
