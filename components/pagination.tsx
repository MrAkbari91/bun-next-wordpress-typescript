import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PaginationInfo } from "@/types/wordpress"

interface PaginationProps {
  pagination: PaginationInfo
  basePath: string
}

export function Pagination({ pagination, basePath }: PaginationProps) {
  const { currentPage, totalPages, hasNext, hasPrev } = pagination

  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {hasPrev && (
        <Button variant="outline" size="sm" asChild>
          <Link href={getPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        </Button>
      )}

      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page) => (
          <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" asChild>
            <Link href={getPageUrl(page)}>{page}</Link>
          </Button>
        ))}
      </div>

      {hasNext && (
        <Button variant="outline" size="sm" asChild>
          <Link href={getPageUrl(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      )}
    </div>
  )
}
