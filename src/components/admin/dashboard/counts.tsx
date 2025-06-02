import { File, User2 } from 'lucide-react'
import CountCard from './count-card'

export default function AdminCounts() {
  return (
    <div className="flex items-center gap-4">
      <CountCard name="Total Projects" count={35} loading={false} Icon={File} />
      <CountCard name="Total Users" count={7} loading={false} Icon={User2} />
    </div>
  )
}
