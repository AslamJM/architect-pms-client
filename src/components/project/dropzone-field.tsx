import { useDropzone } from 'react-dropzone'
import type { UploadType } from '@/types/project'
import { createMockUrl } from '@/lib/mock'
import { useProjectId } from '@/hooks/use-project-id'

type Props = {
  type: UploadType
  urls: Array<string>
  setUrls: React.Dispatch<React.SetStateAction<Array<string>>>
}

export default function DropzoneField({ type, urls, setUrls }: Props) {
  const id = useProjectId()

  const onDrop = async (acceptedFiles: Array<File>) => {
    // mock image upload
    // !TODO connect to backend upload to S3
    const uploadedUrls = acceptedFiles.map((file) => {
      return createMockUrl(file.name, type, id)
    })

    setUrls((prev) => [...prev, ...uploadedUrls])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="p-2 bg-muted border-dashed border-muted-foreground border-[1px] rounded-md h-[100px]"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-muted-foreground text-sm">
            Drop the files here ...
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            drop files here, or click to select files
          </p>
        )}
      </div>
    </div>
  )
}
