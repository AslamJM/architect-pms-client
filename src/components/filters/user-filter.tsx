import { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useUsers } from '@/hooks/use-users'

type Props = {
  setAssignedTo: (id: string | undefined) => void
}

export default function UserFilter({ setAssignedTo }: Props) {
  const { data, isLoading } = useUsers()

  const values = useMemo(() => {
    if (isLoading || !data) return []
    return data
      .filter((d) => d.role === 'USER')
      .map((user) => ({
        value: user.id,
        label: user.name,
      }))
  }, [data])

  const onSelect = (value: string) => {
    setAssignedTo(value === 'all' ? undefined : value)
  }

  return (
    <div>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Assign To" className="w-full" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            {values.map((user) => (
              <SelectItem key={user.value} value={user.value}>
                {user.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
