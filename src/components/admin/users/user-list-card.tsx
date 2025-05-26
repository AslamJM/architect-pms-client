import { Edit2Icon, HammerIcon, MoreHorizontal, TextCursor } from 'lucide-react'
import { useState } from 'react'
import EditUserDialog from './edit-user-dg'
import type { User } from '@/types/user'
import { TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

type Props = {
  user: User
}

export default function UserListCard({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <EditUserDialog open={menuOpen} setOpen={setMenuOpen} data={user} />
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>
          <Badge className="capitalize" variant="outline">
            {user.role.split('_').join(' ').toLowerCase()}
          </Badge>
        </TableCell>
        <TableCell className="text-muted-foreground">{user.username}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setMenuOpen(true)}>
                <Edit2Icon className="w-4 h-4 text-orange-500" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TextCursor className="w-4 h-4 text-blue-500" /> Change Password
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HammerIcon className="w-4 h-4 text-red-500" />
                Ban User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  )
}
