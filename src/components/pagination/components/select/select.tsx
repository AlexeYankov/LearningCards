import s from './pagination.module.scss'

import sprite from '../asserts/sprite.svg'

type SelectType = {
  ArrowID: string
  pages: number
  height: number
  width: number
  viewBox: string
}

export const Select = ({ ArrowID, pages, width, height, viewBox }: SelectType) => {
  return (
    <div className={s.pagesContainer}>
      <div className={s.checkboxUnselected}>
        <svg width={width} height={height} viewBox={viewBox}>
          <use xlinkHref={`${sprite}#${ArrowID}`} />
        </svg>
      </div>
    </div>
  )
}
