import { useMutation } from '@tanstack/react-query'
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
            .map((up) => <p key={up.url}>{up.url}</p>)}
      </div>
      {isUser && (
        <input type="file" className="p-4 bg-muted" onChange={hadleUpload} />
      )}
    </div>
  )
}
