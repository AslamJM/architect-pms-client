import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  phase_no: number
}

export default function UploadedFiles({ phase_no }: Props) {
  const id = useProjectId()
  const { data } = useSingleProject(id)

  const phase = data?.phases.find((p) => p.phase_number === phase_no)

  return (
    <div className="space-y-4">
      <h4>Uploaded Files</h4>
      {phase && (
        <div>
          {phase.uploads
            .filter((u) => u.type === 'UPLOADED_FILES')
            .map((up) => (
              <p key={up.url}>{up.url}</p>
            ))}
        </div>
      )}
    </div>
  )
}
