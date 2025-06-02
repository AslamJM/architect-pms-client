import { Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  loading: boolean
  name: string
  count: number
  Icon: LucideIcon
}

export default function CountCard({ name, count, loading, Icon }: Props) {
  return (
    <Card className="w-1/3">
      <CardContent className="flex flex-col gap-2 items-center justify-center">
        <Icon className="text-teal-800" />
        <h4 className="text-sm text-muted-foreground  tracking-wide">{name}</h4>
        {loading ? (
          <Loader2 className="animate-spin text-muted-foreground" />
        ) : (
          <div className="font-semibold">{count}</div>
        )}
      </CardContent>
    </Card>
  )
}
