import { useGetDecksQuery } from '@/api/decks/decks.api.ts'
import { changeCurrentPage } from '@/api/decks/pagination.reducer.ts'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import sprite from '@/asserts/sprite.svg'

import s from './pages.module.scss'

import { setPageHandler } from '../utils/counter'
import PagesForRender from './pagesForRender'
import { PaginationResponseType } from '@/api/common.api.ts'

type PagesType = {
  arrowID: string
  color?: string
  onPaginationClick?: (newValues: Partial<PaginationResponseType>) => void
  reversedArrowID: string
  startPagesFrom?: number
  totalPages?: number
}

export const Pages = ({
  arrowID,
  color,
  onPaginationClick,
  reversedArrowID,
  totalPages = 20,
}: PagesType) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)

  useGetDecksQuery({ currentPage, itemsPerPage })

  const setCurrentPage = (callbackIconID: string) => {
    setPageHandler(
      arrowID,
      reversedArrowID,
      currentPage,
      totalPages,
      callbackIconID,
      handlePageChange
    )
  }

  const handlePageChange = (page: number) => {
    dispatch(changeCurrentPage({ currentPage: page }))
    onPaginationClick && onPaginationClick({ currentPage: page, itemsPerPage })
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

      <PagesForRender page={currentPage} pages={totalPages} setPage={handlePageChange} />

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
