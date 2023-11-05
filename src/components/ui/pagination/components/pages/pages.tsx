import s from './pages.module.scss'

import { setPageHandler } from '../utils/counter'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { changeCurrentPage } from '@/api/decks/pagination.reducer.ts'
import { useGetDecksQuery } from '@/api/decks/decks.api.ts'

type PagesType = {
  arrowID: string
  color?: string
  reversedArrowID: string
  startPagesFrom?: number
  totalPages?: number
  onPaginationClick: (page: { currentPage: number }) => void
}

export const Pages = ({
  arrowID,
  color,
  reversedArrowID,
  onPaginationClick,
  totalPages = 20,
}: PagesType) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.pagination.currentPage)

  useGetDecksQuery({ currentPage })

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
    onPaginationClick({ currentPage: page })
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
