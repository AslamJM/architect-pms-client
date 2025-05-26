import { CheckCheckIcon, HourglassIcon } from 'lucide-react'
import { Badge } from '../ui/badge'

type Props = {
  isCompleted: boolean
}

export default function ProjectCompleted({ isCompleted }: Props) {
  return (
    <div>
      {isCompleted ? (
        <Badge variant="outline" className="text-green-500 border-green-500">
          <CheckCheckIcon />
          completed
        </Badge>
      ) : (
        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
          <HourglassIcon /> pending
        </Badge>
      )}
    </div>
  )
}
