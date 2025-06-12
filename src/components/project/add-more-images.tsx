import { ImagePlusIcon, Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { multiPartFormDataUploads } from '@/api/uploads'
import { addMoreImages } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

export default function AddMoreImagesToTask({ taskId }: { taskId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const projectId = useProjectId()
  const { invalidate } = useSingleProject(projectId)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const onFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files

      if (files && files.length > 0) {
        const formData = new FormData()

        for (const file of files) {
          formData.append('files', file)
        }

        const urls = await uploadFiles.mutateAsync(formData)

        mutate({
          taskId,
          urls,
        })
      }
    } catch (error) {}
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addMoreImages,
    onSuccess: () => {
      toast('Image Upload', {
        description: 'Images uploaded successfully',
        style: { color: 'green' },
      })
      invalidate()
    },
  })

  const uploadFiles = useMutation({
    mutationFn: multiPartFormDataUploads,
    onError: (e) => {
      console.log(e)
    },
  })

  const loading = isPending || uploadFiles.isPending

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-[130px] h-[100px] rounded border-[1px] border-muted-foreground flex flex-col items-center justify-center"
    >
      <input
        type="file"
        name="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onFilesChange}
        multiple
        accept="image/*"
      />
      {!loading ? (
        <ImagePlusIcon className="text-muted-foreground" />
      ) : (
        <Loader2 className="text-muted-foreground animate-spin" />
      )}
      <span className="text-sm text-muted-foreground">
        {loading ? 'Uploading...' : 'Add more'}
      </span>
    </div>
  )
}
