import { File, User2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import CountCard from './count-card'
import MonthlyReport from './monthly-report'
import { getCounts } from '@/api/dashboard'

export default function AdminCounts() {
  const { data, isLoading } = useQuery({
    queryFn: getCounts,
    queryKey: ['admin_counts'],
  })

  return (
    <div className="flex items-center gap-4">
      <CountCard
        name="Total Projects"
        count={data ? data.projects : 0}
        loading={isLoading}
        Icon={File}
      />
      <CountCard
        name="Total Users"
        count={data ? data.users : 0}
        loading={isLoading}
        Icon={User2}
      />
      <MonthlyReport />
    </div>
  )
}
