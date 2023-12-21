import { changeCurrentPage } from '@/api/decks/decks.reducer.ts'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import sprite from '@/asserts/sprite.svg'

import s from './pages.module.scss'
import PagesForRender from './pagesForRender'
import { changeCardsCurrentPage } from '@/api/cards'

type PagesType = {
  arrowID: string
  color?: string
  reversedArrowID: string
  startPagesFrom?: number
  totalPages?: number
}

export const Pages = ({ arrowID, color, reversedArrowID, totalPages = 10 }: PagesType) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.decks.currentPage)

  const handlePageChange = (page: number) => {
    dispatch(changeCurrentPage({ currentPage: page }))
    dispatch(changeCardsCurrentPage({ currentPage: page }))
    localStorage.setItem('page', page.toString())
  }

  const prevPage = currentPage - 1 === 0 ? 1 : currentPage - 1
  const nextPage = currentPage + 1 >= totalPages ? totalPages : currentPage + 1

  return (
    <div className={s.pagesContainer}>
      <svg
        className={s.icons}
        fill={color || 'black'}
        onClick={() => handlePageChange(prevPage)}
        style={currentPage === 1 ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${arrowID}`} />
      </svg>

      <PagesForRender page={currentPage} pages={totalPages} setPage={handlePageChange} />
      <svg
        fill={color || 'black'}
        onClick={() => handlePageChange(nextPage)}
        className={s.icons}
        style={
          currentPage === totalPages
            ? {
                opacity: '0.7',
                pointerEvents: 'none',
              }
            : {}
        }
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${reversedArrowID}`} />
      </svg>
    </div>
  )
}
