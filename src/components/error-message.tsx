import { AlertCircleIcon } from 'lucide-react'

type Props = {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="text-sm text-red-500 flex items-center gap-1">
      <AlertCircleIcon className="w-4 h-4" /> {message}
    </div>
  )
}
