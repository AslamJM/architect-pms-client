import AddPhaseToProject from './add-phase'
import ProjectPhase from './phase'
import { useAbilty } from '@/hooks/use-ability'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

export default function WorkSpace() {
  const id = useProjectId()
  const { data } = useSingleProject(id)
  const { canAddTasks } = useAbilty()
  if (!data) return

  return (
    <div className="p-8 space-y-4">
      <div className="space-y-4">
        {data.phases.map((ph) => (
          <ProjectPhase key={ph.phase_number} phase_number={ph.phase_number} />
        ))}
      </div>
      {canAddTasks && <AddPhaseToProject next_phase={data.phases.length + 1} />}
    </div>
  )
}
