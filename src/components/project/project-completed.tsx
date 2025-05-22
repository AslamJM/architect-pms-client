import { CheckCheckIcon, HourglassIcon } from 'lucide-react'
import { Badge } from '../ui/badge'

type Props = {
  isCompleted: boolean
}

export default function ProjectCompleted({ isCompleted }: Props) {
  return (
    <div>
      {isCompleted ? (
        <Badge variant="outline">
          <CheckCheckIcon />
          completed
        </Badge>
      ) : (
        <Badge variant="outline">
          <HourglassIcon /> pending
        </Badge>
      )}
    </div>
  )
}
