import { XIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type Props = {
  urls: Array<string>
  setUrls: React.Dispatch<React.SetStateAction<Array<string>>>
}

export default function TaskImageUpload({ urls, setUrls }: Props) {
  const onDrop = (acceptedFiles: Array<File>) => {
    // mock image upload
    // !TODO connect to backend upload to S3
    const uploadedUrls = acceptedFiles.map((file) => {
      return URL.createObjectURL(file)
    })

    setUrls((prev) => [...prev, ...uploadedUrls])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const removeImage = (url: string) => {
    setUrls((prev) => prev.filter((item) => item !== url))
    URL.revokeObjectURL(url) // Free up memory
  }

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="p-2 bg-muted border-dashed border-muted-foreground border-[1px] rounded-md h-[100px]"
      >
        <input {...getInputProps()} accept="image/*" />
        {isDragActive ? (
          <p className="text-muted-foreground text-sm">
            Drop the files here ...
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            drop image files here, or click to select files
          </p>
        )}
      </div>
      <div>
        {urls.length > 0 && (
          <div className="flex  gap-2">
            {urls.map((url, index) => (
              <div className="relative" key={index}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 z-10"
                  onClick={() => removeImage(url)}
                >
                  <XIcon className="w-2 h-2" />
                </Button>
                <img
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="h-[100px] w-[100px] rounded-md"
                />
              </div>
            ))}
          </div>
        )}
        {urls.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No images uploaded yet.
          </p>
        )}
      </div>
    </div>
  )
}
