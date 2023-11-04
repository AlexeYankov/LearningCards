import s from './pages.module.scss'

import sprite from '@/asserts/sprite.svg'
import { PagesForRender } from './pagesForRender'
import { setPageHandler } from '../utils/counter'
import { PaginationResponseType } from '@/api/common.api.ts'
import { useGetDecksQuery } from '@/api/decks/decks.api.ts'
import { useState } from 'react'

type PagesType = {
  arrowID: string
  color?: string
  reversedArrowID: string
  startPagesFrom?: number
  itemsPerPage?: number
}

export const Pages = ({ arrowID, color, reversedArrowID }: PagesType) => {
  const [query, setQuery] = useState<any>(undefined)

  const { data } = useGetDecksQuery(query)

  const { currentPage, itemsPerPage, totalItems, totalPages }: PaginationResponseType = {
    currentPage: data?.pagination?.currentPage || 1,
    itemsPerPage: data?.pagination?.itemsPerPage || 10,
    totalItems: data?.pagination?.totalItems || 100,
    totalPages: data?.pagination?.totalPages || 20,
  }

  console.log(itemsPerPage)
  console.log(totalItems)
  console.log(currentPage)

  const setCurrentPage = (callbackIconID: string) => {
    setPageHandler(
      arrowID,
      reversedArrowID,
      currentPage,
      totalPages,
      callbackIconID,
      handlePaginationClick
    )
  }

  const handlePaginationClick = (page: number) => {
    setQuery({ currentPage: page, itemsPerPage })
  }

  return (
    <div className={s.pagesContainer}>
      <svg
        fill={color || 'black'}
        onClick={() => setCurrentPage(arrowID)}
        style={currentPage === 1 ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${arrowID}`} />
      </svg>

      <PagesForRender page={currentPage} pages={totalPages} setPage={handlePaginationClick} />

      <svg
        fill={color || 'black'}
        onClick={() => setCurrentPage(reversedArrowID)}
        style={currentPage === totalPages ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${reversedArrowID}`} />
      </svg>
    </div>
  )
}
