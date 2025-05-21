import { UsersIcon } from 'lucide-react'
import UserListCard from './user-list-card'
import { useUsers } from '@/hooks/use-users'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import TableRowsSkeleton from '@/components/skeletons/table-rows'

export default function UsersList() {
  const { data, isLoading } = useUsers()

  return (
    <div className="space-y-4 flex-grow">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <UsersIcon className="w-6 h-6 text-teal-700" />{' '}
            <h3 className="text-xl font-semibold">Users</h3>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRowsSkeleton cols={4} />}
              {data && data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No Users were found.
                  </TableCell>
                </TableRow>
              )}
              {data && data.map((u) => <UserListCard key={u.id} user={u} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
