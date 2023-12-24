import { changeCurrentPage } from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import sprite from '@/asserts/sprite.svg'

import s from './pages.module.scss'
import PagesForRender from './pagesForRender'
import { changeCardsCurrentPage } from '@/api/cards'
import { LocationType } from '@/components/ui/pagination'

type PagesType = {
  arrowID: string
  color?: string
  reversedArrowID: string
  startPagesFrom?: number
  totalPages?: number
  location: LocationType
}

export const Pages = ({
  arrowID,
  color,
  reversedArrowID,
  totalPages = 10,
  location,
}: PagesType) => {
  const dispatch = useAppDispatch()

  let currentPage
  if (location === 'decks') {
    currentPage = useAppSelector(state => state.decks.currentPage)
  } else {
    currentPage = useAppSelector(state => state.cards.currentPage)
  }

  const handlePageChange = (page: number) => {
    if (location === 'decks') {
      dispatch(changeCurrentPage({ currentPage: page }))
      localStorage.setItem('page', page.toString())
    } else {
      dispatch(changeCardsCurrentPage({ currentPage: page }))
    }
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
