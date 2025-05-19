import { useUsers } from '@/hooks/use-users'

export default function UsersList() {
  const { data, isLoading } = useUsers()

  return (
    <div className="space-y-4">
      <div>
        <h3>Users</h3>
        <hr />
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {data &&
          data.map((u) => (
            <div key={u.id}>
              {u.name} - {u.role}
            </div>
          ))}
      </div>
    </div>
  )
}
