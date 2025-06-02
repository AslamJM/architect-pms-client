import { useQuery } from '@tanstack/react-query'
import RecentWorkCard from './recent-work-card'
import { getRecentUploads } from '@/api/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ErrorMessage from '@/components/error-message'

export default function RecentUploads() {
  const { data, isPending, error } = useQuery({
    queryKey: ['recent_uploads'],
    queryFn: getRecentUploads,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Works Submitted</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <ErrorMessage message="an error has occurred" />}
        {data && data.length === 0 && (
          <div className="text-sm text-muted-foreground">
            no recents works were submitted.
          </div>
        )}
        {data &&
          data.map((d, i) => (
            <RecentWorkCard key={`recent-work-${i}`} work={d} />
          ))}
      </CardContent>
    </Card>
  )
}
