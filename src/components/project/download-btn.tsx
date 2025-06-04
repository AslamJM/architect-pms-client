import { DownloadIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { getFileNameFromUrl } from '@/lib/mock'

type Props = {
  url: string
}

export default function DownloadButton({ url }: Props) {
  const onDownload = () => {
    const link = document.createElement('a')
    link.href = url
    link.download = getFileNameFromUrl(url) || ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={onDownload}
        >
          <DownloadIcon className="w-4 h-4 text-blue-700" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download the file</TooltipContent>
    </Tooltip>
  )
}
