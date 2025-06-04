import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { getRecentProjectsDashboard } from '@/api/dashboard'
import { Badge } from '@/components/ui/badge'
import { useAbilty } from '@/hooks/use-ability'
import TableRowsSkeleton from '@/components/skeletons/table-rows'

export default function RecentProjectsAdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['recent_project_dashboard'],
    queryFn: getRecentProjectsDashboard,
  })

  const { isAdmin } = useAbilty()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRowsSkeleton cols={4} />}
            {data && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No recent projects.</TableCell>
              </TableRow>
            )}
            {data &&
              data.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <Link
                      to={
                        isAdmin
                          ? '/dashboard/admin/projects/$id'
                          : '/dashboard/pm/projects/$id'
                      }
                      params={{ id: d.id }}
                      className="hover:underline hover:text-teal-900 text-sm"
                    >
                      {d.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {d.assigned_to.name}
                  </TableCell>
                  <TableCell>{formatDate(d.created_at)}</TableCell>
                  <TableCell>
                    {d.is_completed ? (
                      <Badge
                        variant="outline"
                        className="border-green-600 text-green-600"
                      >
                        completed
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-yellow-600 text-yellow-500"
                      >
                        pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className="p-2">
            <TableRow>
              <TableCell colSpan={4}>
                <Link
                  to={
                    isAdmin
                      ? '/dashboard/admin/projects'
                      : '/dashboard/pm/projects'
                  }
                  className="flex items-center gap-1"
                >
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
