import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import SingleWorkFile from './single-work-file'
import DropzoneField from './dropzone-field'
import { uploadForPhase } from '@/api/uploads'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { createMockUrl } from '@/lib/mock'
import { useAbilty } from '@/hooks/use-ability'

type Props = {
  phase_no: number
}

export default function UploadedFiles({ phase_no }: Props) {
  const id = useProjectId()
  const { data, invalidate } = useSingleProject(id)
  const { canAddTasks } = useAbilty()

  const phase = data?.phases.find((p) => p.phase_number === phase_no)
  const { mutate, isPending } = useMutation({
    mutationFn: uploadForPhase,
    onSuccess: () => {
      invalidate()
    },
  })

  const onDrop = async (files: Array<File>) => {
    const mockUrls = files.map((f) =>
      createMockUrl(f.name, 'UPLOADED_FILES', id),
    )
    mockUrls.forEach((url) =>
      mutate({
        projectId: id,
        data: {
          phase_number: phase_no,
          type: 'UPLOADED_FILES',
          url,
        },
      }),
    )
  }

  const files =
    phase && phase.uploads.filter((u) => u.type === 'UPLOADED_FILES')

  return (
    <div className="space-y-2">
      {files && (
        <div className="space-y-4">
          {files.length === 0 && (
            <div className="text-sm text-muted-foreground">
              no files were uploaded.
            </div>
          )}

          {files.map((up) => (
            <SingleWorkFile key={up.id} upload={up} />
          ))}
        </div>
      )}
      {canAddTasks && (
        <>
          <div className="flex items-center gap-4">
            <h6>Add more files</h6>
            {isPending && (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">uploading...</p>
              </div>
            )}
          </div>
          <DropzoneField onDrop={onDrop} />
        </>
      )}
    </div>
  )
}
