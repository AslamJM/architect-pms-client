import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'

import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { addPhase } from '@/api/project'

type Props = {
  next_phase: number
}

export default function AddPhaseToProject({ next_phase }: Props) {
  const [showPhaseForm, setShowPhaseForm] = useState(false)
  const [urls, setUrls] = useState<Array<string>>([])

  const id = useProjectId()
  const { invalidate } = useSingleProject(id)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      setUrls((prev) => [...prev, `https://my-server/${file.name}`])
    }
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
        <div className="space-y-2">
          <div className="bg-muted h-[150px] p-4 space-y-4">
            <p>Upload Working Files Here ....</p>
            <input
              type="file"
              className="bg-green-300 p-4"
              onChange={handleFileUpload}
            />
            <div className="flex gap-4">
              <Button disabled={isPending} onClick={createPhase}>
                Create Phase
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowPhaseForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={() => setShowPhaseForm(true)}>Add New Phase</Button>
        </div>
      )}
    </div>
  )
}
