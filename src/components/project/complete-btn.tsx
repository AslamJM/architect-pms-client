import { useMutation } from '@tanstack/react-query'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { updateProject } from '@/api/project'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

type Props = {
  name: 'is_completed' | 'is_paid'
}

export default function ProjectCompleteButton({ name }: Props) {
  const id = useProjectId()
  const { data, updateProject: update } = useSingleProject(id)

  const { mutate, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      update({ [name]: !data![name] })
    },
  })

  return (
    <div>
      {data && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              className="cursor-pointer"
              variant="ghost"
              onClick={() => {
                mutate({
                  id,
                  data: {
                    [name]: !data[name],
                  },
                })
              }}
              disabled={isPending}
            >
              {data[name] ? (
                <XCircle className="w-4 h-4 text-red-500" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {name === 'is_completed'
                ? data.is_completed
                  ? 'Mark as Incomplete'
                  : 'Mark as Completed'
                : data.is_paid
                  ? 'Mark as Unpaid'
                  : 'Mark as Paid'}
            </p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
