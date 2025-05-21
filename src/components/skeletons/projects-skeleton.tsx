import { Skeleton } from '../ui/skeleton'

export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="rounded h-[160px]" />
        </div>
      ))}
    </div>
  )
}
