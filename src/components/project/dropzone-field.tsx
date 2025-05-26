import { useDropzone } from 'react-dropzone'

type Props = {
  onDrop: (acceptedFiles: Array<File>) => Promise<void>
}

export default function DropzoneField({ onDrop }: Props) {
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
