import { Skeleton } from '../ui/skeleton'

export default function SingleProjectSkeleton() {
  return (
    <div className="space-y-10  h-[600px] pt-20 px-20">
      <div>
        <Skeleton className="h-[40px] w-[350px]" />
      </div>
      <div className="flex items-center justify-center">
        <Skeleton className="h-[400px] w-[1000px]" />
      </div>
    </div>
  )
}
