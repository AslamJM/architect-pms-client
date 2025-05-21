import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
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
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <DropdownMenuItem>Ban User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
