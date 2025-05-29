import { CheckCheckIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useAbilty } from '@/hooks/use-ability'
import { verifyPhase } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  phase_number: number
  verified: boolean
}

export default function VerifyPhase({ phase_number, verified }: Props) {
  const projectId = useProjectId()
  const { invalidate } = useSingleProject(projectId)
  const { canAddTasks } = useAbilty()

  const { mutate, isPending } = useMutation({
    mutationFn: verifyPhase,
    onSuccess: () => {
      invalidate()
    },
  })

  const handleVerify = () => {
    mutate({
      phase: phase_number,
      projectId,
      verified: !verified,
    })
  }

  return (
    <>
      {!verified && canAddTasks && (
        <Button onClick={handleVerify} disabled={isPending}>
          Verify Work
        </Button>
      )}
      {verified && (
        <Badge className="bg-amber-500">
          <CheckCheckIcon />
          Verified
        </Badge>
      )}
    </>
  )
}
