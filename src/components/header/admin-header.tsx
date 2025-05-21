import { BookImageIcon, HomeIcon, Users2Icon } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import Logo from './logo'
import UserButton from './user-button'
import { cn } from '@/lib/utils'

export default function AdminHeader() {
  const { pathname } = useLocation()
  return (
    <div className="p-4 w-full  flex items-center justify-between gap-4 border-b-[1px] border-muted sticky">
      <Logo />
      <div className="flex items-center gap-8">
        <div
          className={cn(
            'flex items-center gap-1  hover:text-teal-700',
            pathname === '/dashboard/admin'
              ? 'text-teal-700'
              : 'text-muted-foreground',
          )}
        >
          <HomeIcon className="w-4 h-4" />
          <Link to="/dashboard/admin">Dashboard</Link>
        </div>
        <div
          className={cn(
            'flex items-center gap-1  hover:text-teal-700',
            pathname.startsWith('/dashboard/admin/projects')
              ? 'text-teal-700'
              : 'text-muted-foreground',
          )}
        >
          <BookImageIcon className="w-4 h-4" />
          <Link to="/dashboard/admin/projects">Projects</Link>
        </div>
        <div
          className={cn(
            'flex items-center gap-1  hover:text-teal-700',
            pathname.startsWith('/dashboard/admin/users')
              ? 'text-teal-700'
              : 'text-muted-foreground',
          )}
        >
          <Users2Icon className="w-4 h-4 " />
          <Link to="/dashboard/admin/users">Users</Link>
        </div>
      </div>
      <UserButton />
    </div>
  )
}
