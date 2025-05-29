import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import { projectCounts } from '@/api/project'

type Props = {
  setPage: (page: number) => void
}

export default function ProjectsPagination({ setPage }: Props) {
  const [current, setCurrent] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['project-counts'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: projectCounts,
  })

  const pages = Math.ceil((data || 0) / 10)

  return (
    <Pagination>
      {data && (
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (current === 1) return
                setCurrent((prev) => prev - 1)
                setPage(current)
              }}
              isActive={current !== 1}
            />
          </PaginationItem>
          {Array.from({ length: pages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => {
                  setCurrent(index + 1)
                  setPage(index + 1)
                }}
                isActive={current !== index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (current === pages) return
                setCurrent((prev) => prev + 1)
                setPage(current)
              }}
              isActive={current !== pages}
            />
          </PaginationItem>
        </PaginationContent>
      )}
    </Pagination>
  )
}
