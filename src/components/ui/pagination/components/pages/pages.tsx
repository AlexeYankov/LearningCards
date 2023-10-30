import { useState } from 'react'

import s from './pages.module.scss'

import sprite from '@/asserts/sprite.svg'
import { PagesForRender } from './pagesForRender'
import { setPageHandler } from '../utils/counter'

type PagesType = {
  arrowID: string
  color?: string
  currentPage?: number
  pages: number
  reversedArrowID: string
  startPagesFrom?: number
}

export const Pages = ({
  arrowID,
  color,
  currentPage = 1,
  pages = 1,
  reversedArrowID,
}: PagesType) => {
  const [page, setPage] = useState(currentPage)

  const setCurrentPage = (callbackIconID: string) => {
    setPageHandler(arrowID, reversedArrowID, page, pages, callbackIconID, setPage)
  }

  return (
    <div className={s.pagesContainer}>
      <svg
        fill={color || 'black'}
        onClick={() => setCurrentPage(arrowID)}
        style={page === 1 ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${arrowID}`} />
      </svg>

      <PagesForRender page={page} pages={pages} setPage={setPage} />

      <svg
        fill={color || 'black'}
        onClick={() => setCurrentPage(reversedArrowID)}
        style={page === pages ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={'0 0 24 24'}
        width={'24px'}
      >
        <use xlinkHref={`${sprite}#${reversedArrowID}`} />
      </svg>
    </div>
  )
}
