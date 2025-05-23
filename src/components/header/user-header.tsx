import Logo from './logo'
import UserButton from './user-button'

export default function UserHeader() {
  return (
    <div className="p-4 w-full  flex items-center justify-between gap-4 border-b-[1px] border-muted sticky">
      <Logo />
      <UserButton />
    </div>
  )
}
