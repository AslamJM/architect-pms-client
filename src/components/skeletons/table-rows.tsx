import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

type Props = {
  cols: number
}

export default function TableRowsSkeleton({ cols }: Props) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={`rowsk-${index}`}>
          {Array.from({ length: cols }).map((_, i) => (
            <TableCell key={`cellsk-${i}`}>
              <Skeleton className="h-[30px] w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
