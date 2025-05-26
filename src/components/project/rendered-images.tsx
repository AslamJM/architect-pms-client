import { useMutation } from '@tanstack/react-query'
import DropzoneField from './dropzone-field'
import DownloadButton from './download-btn'
import FileDeleteButton from './file-delete-button'
import { uploadForPhase } from '@/api/uploads'
import { useAbilty } from '@/hooks/use-ability'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { createMockUrl } from '@/lib/mock'

type Props = {
  phase_no: number
}

export default function RenderedImages({ phase_no }: Props) {
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
    const mockUrls = files.map((f) =>
      createMockUrl(f.name, 'RENDERED_IMAGES', id),
    )
    mockUrls.forEach((url) =>
      mutate({
        projectId: id,
        data: {
          phase_number: phase_no,
          type: 'RENDERED_IMAGES',
          url,
        },
      }),
    )
  }

  const files =
    phase && phase.uploads.filter((u) => u.type === 'RENDERED_IMAGES')

  return (
    <div className="space-y-4">
      {files && files.length === 0 && (
        <div className="text-sm text-muted-foreground">
          no rendered images were uploaded.
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {files &&
          files.map((up) => (
            <div key={up.id} className="relative">
              <img
                src={'https://picsum.photos/400'}
                className="h-[150px] object-cover rounded w-full"
              />
              <div className="absolute top-0 right-0 p-1 z-10">
                <DownloadButton url={up.url} />
                {isUser && <FileDeleteButton uploadId={up.id} />}
              </div>
            </div>
          ))}
      </div>
      {isUser && <DropzoneField onDrop={onDrop} />}
    </div>
  )
}
