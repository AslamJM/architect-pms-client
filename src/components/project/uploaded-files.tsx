import SingleWorkFile from './single-work-file'
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
    <div>
      {phase && (
        <div className="space-y-4">
          {phase.uploads
            .filter((u) => u.type === 'UPLOADED_FILES')
            .map((up) => (
              <SingleWorkFile key={up.id} upload={up} />
            ))}
        </div>
      )}
    </div>
  )
}
