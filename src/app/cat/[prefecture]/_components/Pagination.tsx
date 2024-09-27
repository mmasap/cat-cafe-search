'use client'

import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const disabledPrevious = currentPage <= 1
  const disabledNext = currentPage >= totalPages
  const selectablePages = Array.from(
    new Set<number>(
      [1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter(
        (v) => v > 0 && v <= totalPages,
      ),
    ),
  )

  if (totalPages === 0) return

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={disabledPrevious}
            tabIndex={disabledPrevious ? -1 : undefined}
            className={disabledPrevious ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {Array.from(selectablePages).map((page, i) => {
          const displayEllipsis = i > 0 && page !== selectablePages[i - 1] + 1
          return (
            <Fragment key={page}>
              {displayEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={createPageURL(page)} isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            </Fragment>
          )
        })}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={disabledNext}
            tabIndex={disabledNext ? -1 : undefined}
            className={disabledNext ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  )
}
