import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { FileIcon, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

import { Card, CardContent } from '../ui/card'
import DropzoneField from './dropzone-field'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { addPhase } from '@/api/project'
import { getFileNameFromUrl } from '@/lib/mock'
import { uploadFilesToServer } from '@/api/uploads'

type Props = {
  next_phase: number
}

export default function AddPhaseToProject({ next_phase }: Props) {
  const [showPhaseForm, setShowPhaseForm] = useState(false)
  const [urls, setUrls] = useState<Array<string>>([])

  const id = useProjectId()
  const { invalidate } = useSingleProject(id)

  const onDrop = async (acceptedFiles: Array<File>) => {
    const data = new FormData()

    acceptedFiles.forEach((f) => {
      data.append('files', f)
    })

    // mock image upload
    // !TODO connect to backend upload to S3
    const uploadedUrls = await uploadFilesToServer(data)

    setUrls((prev) => [...prev, ...uploadedUrls])
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addPhase,
    onSuccess: () => {
      setUrls([])
      invalidate()
      setShowPhaseForm(false)
    },
  })

  const createPhase = () => {
    mutate({
      projectId: id,
      data: {
        phase_number: next_phase,
        upload_urls: urls,
      },
    })
  }

  return (
    <div className="space-y-4">
      {showPhaseForm ? (
        <Card>
          <CardContent className="space-y-4">
            <h5>Upload Working Files</h5>
            <DropzoneField onDrop={onDrop} />
            <div className="flex items-center gap-4">
              {urls.map((url) => (
                <div
                  key={url}
                  className="flex flex-col items-center rounded justify-center p-2 border-[1px] border-[muted]"
                >
                  <FileIcon />
                  <p className="text-sm text-muted-foreground">
                    {getFileNameFromUrl(url)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button disabled={isPending} onClick={createPhase}>
                {isPending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                Create Phase
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowPhaseForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Button onClick={() => setShowPhaseForm(true)}>Add New Phase</Button>
        </div>
      )}
    </div>
  )
}
