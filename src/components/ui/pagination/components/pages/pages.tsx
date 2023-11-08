import { changeCurrentPage } from '@/api/decks/pagination.reducer.ts'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import sprite from '@/asserts/sprite.svg'

import s from './pages.module.scss'

import { setPageHandler } from '../utils/counter'
import PagesForRender from './pagesForRender'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type PagesType = {
  arrowID: string
  color?: string
  reversedArrowID: string
  startPagesFrom?: number
  totalPages?: number
}

export const Pages = ({ arrowID, color, reversedArrowID, totalPages = 20 }: PagesType) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)

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
  }

  useEffect(() => {}, [minCardsCount, maxCardsCount])

  const getToCurrentPageUrl = (pageValue: number) => {
    searchParams.set('currentPage', String(pageValue))
    return { search: searchParams.toString() }
  }

  return (
    <div className={s.pagesContainer}>
      <Link to={getToCurrentPageUrl(currentPage)}>
        <svg
          fill={color || 'black'}
          onClick={() => setCurrentPage(arrowID)}
          style={currentPage === 1 ? { opacity: '0.7', pointerEvents: 'none' } : {}}
          viewBox={'0 0 24 24'}
          width={'24px'}
        >
          <use xlinkHref={`${sprite}#${arrowID}`} />
        </svg>
      </Link>

      <PagesForRender page={currentPage} pages={totalPages} setPage={handlePageChange} />
      <Link to={getToCurrentPageUrl(currentPage)}>
        <svg
          fill={color || 'black'}
          onClick={() => setCurrentPage(reversedArrowID)}
          style={currentPage === totalPages ? { opacity: '0.7', pointerEvents: 'none' } : {}}
          viewBox={'0 0 24 24'}
          width={'24px'}
        >
          <use xlinkHref={`${sprite}#${reversedArrowID}`} />
        </svg>
      </Link>
    </div>
  )
}
