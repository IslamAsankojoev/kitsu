//@ts-nocheck
import React, { useEffect } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { useSearchParams } from 'react-router-dom'

const PaginationComp = ({ total, offset, limit }: { total: number; offset: number; limit: number }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [renderPages, setRenderPages] = React.useState<number[]>([])
  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  const handlePageClick = (page: any) => {
    const newOffset = (page - 1) * limit
    const newParams = new URLSearchParams(searchParams)
    newParams.set('offset', newOffset.toString())
    setSearchParams(newParams)
  }

  const handleNextClick = () => {
    const newOffset = offset + limit
    const newParams = new URLSearchParams(searchParams)
    newParams.set('offset', newOffset.toString())
    setSearchParams(newParams)
  }

  const handlePrevClick = () => {
    const newOffset = offset - limit
    const newParams = new URLSearchParams(searchParams)
    newParams.set('offset', newOffset.toString())
    setSearchParams(newParams)
  }

  const pages: number[] = []
  for (let page = 1; page <= totalPages / limit; page++) {
    pages.push(page)
  }

  useEffect(() => {
    let pageNumbers = []
    if(currentPage <= 4) {
        pageNumbers = []
        for (let page = 1; page <= 5; page++) {
          pageNumbers.push(page)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
    }

    if(currentPage >= 5 && currentPage <= totalPages - 4) {
        pageNumbers = []
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let page = currentPage - 2; page <= currentPage + 2; page++) {
          pageNumbers.push(page)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
    }
    if(currentPage >= totalPages - 3) {
        pageNumbers = []
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let page = totalPages - 4; page <= totalPages; page++) {
          pageNumbers.push(page)
        }
    }

    setRenderPages(pageNumbers)
  }, [currentPage, totalPages])

  return (
    <>
    <Pagination>
      <PaginationContent>
        {offset > 0 && (
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevClick} />
          </PaginationItem>
        )}

        {renderPages.map((page, index) => {
          if(page === '...') return (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          )
          return (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageClick(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {offset + limit < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={handleNextClick} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
    </>
  )
}

export default PaginationComp
