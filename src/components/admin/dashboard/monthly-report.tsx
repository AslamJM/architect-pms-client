import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getThismonthProjects } from '@/api/dashboard'

export default function MonthlyReport() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly_report'],
    queryFn: getThismonthProjects,
  })
  return (
    <Card className="w-1/3 h-[150px]">
      <CardHeader>
        <CardTitle>{format(new Date(), 'MMMM, yyyy')}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        )}
        {data && (
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Completed: {data.completed} /{' '}
              {data.completed + data.not_completed}
            </div>
            <div className="text-sm text-muted-foreground">
              Paid: {data.paid} / {data.not_paid + data.paid}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
