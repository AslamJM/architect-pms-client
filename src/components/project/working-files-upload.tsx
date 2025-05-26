import { useMutation } from '@tanstack/react-query'
import SingleWorkFile from './single-work-file'
import DropzoneField from './dropzone-field'
import type { UploadType } from '@/types/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { useAbilty } from '@/hooks/use-ability'
import { uploadForPhase } from '@/api/uploads'
import { createMockUrl } from '@/lib/mock'

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

  const onDrop = async (files: Array<File>) => {
    const mockUrls = files.map((f) => createMockUrl(f.name, type, id))
    mockUrls.forEach((url) =>
      mutate({
        projectId: id,
        data: {
          phase_number: phase_no,
          type,
          url,
        },
      }),
    )
  }

  const files = phase && phase.uploads.filter((u) => u.type === 'WORKING_FILES')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {files && files.length === 0 && (
          <div className="text-sm text-muted-foreground">
            no working files were uploaded.
          </div>
        )}

        {files && files.map((up) => <SingleWorkFile key={up.id} upload={up} />)}
      </div>
      {isUser && <DropzoneField onDrop={onDrop} />}
    </div>
  )
}
