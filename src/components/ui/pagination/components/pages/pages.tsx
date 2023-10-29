import { useState } from 'react'

import s from './pages.module.scss'

import sprite from '@/asserts/sprite.svg'
import { PagesForRender } from './pagesForRender'
import { setPageHandler } from '../utils/counter'

type PagesType = {
  arrowID: string
  color?: string
  currentPage?: number
  height?: string
  pages: number
  reversedArrowID: string
  startPagesFrom?: number
  viewBox?: string
  width?: string
}

export const Pages = ({
  arrowID,
  color,
  currentPage = 1,
  height = '24',
  pages = 1,
  reversedArrowID,
  viewBox,
  width = '24',
}: PagesType) => {
  const [page, setPage] = useState(currentPage)

  const setCurrentPage = (callbackIconID: string) => {
    setPageHandler(arrowID, reversedArrowID, page, pages, callbackIconID, setPage)
  }

  return (
    <div className={s.pagesContainer}>
      <svg
        fill={color || 'black'}
        height={height}
        onClick={() => setCurrentPage(arrowID)}
        style={page === 1 ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={viewBox}
        width={width}
      >
        <use xlinkHref={`${sprite}#${arrowID}`} />
      </svg>

      <PagesForRender page={page} pages={pages} setPage={setPage} />

      <svg
        fill={color || 'black'}
        height={height}
        onClick={() => setCurrentPage(reversedArrowID)}
        style={page === pages ? { opacity: '0.7', pointerEvents: 'none' } : {}}
        viewBox={viewBox}
        width={width}
      >
        <use xlinkHref={`${sprite}#${reversedArrowID}`} />
      </svg>
    </div>
  )
}
