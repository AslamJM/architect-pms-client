import { Link, useLocation } from '@tanstack/react-router'
import { BookImageIcon, HomeIcon } from 'lucide-react'
import UserButton from './user-button'
import Logo from './logo'
import { cn } from '@/lib/utils'

export default function PMheader() {
  const { pathname } = useLocation()
  return (
    <div className="p-4 w-full  flex items-center justify-between gap-4 border-b-[1px] border-muted sticky">
      <Logo />
      <div className="flex items-center gap-8">
        <div
          className={cn(
            'flex items-center gap-1  hover:text-teal-700',
            pathname === '/dashboard/pm'
              ? 'text-teal-700'
              : 'text-muted-foreground',
          )}
        >
          <HomeIcon className="w-4 h-4" />
          <Link to="/dashboard/pm">Dashboard</Link>
        </div>
        <div
          className={cn(
            'flex items-center gap-1  hover:text-teal-700',
            pathname.startsWith('/dashboard/pm/projects')
              ? 'text-teal-700'
              : 'text-muted-foreground',
          )}
        >
          <BookImageIcon className="w-4 h-4" />
          <Link to="/dashboard/pm/projects">Projects</Link>
        </div>
      </div>
      <UserButton />
    </div>
  )
}
