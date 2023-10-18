import s from './pages.module.scss'

import sprite from '../../../../asserts/sprite.svg'

type PagesType = {
  arrowID: string
  reversedArrowID: string
  pages: number
  height?: string
  width?: string
  viewBox?: string
  color?: string
}

export const Pages = ({
  arrowID,
  reversedArrowID,
  pages = 1,
  width = '24',
  height = '24',
  viewBox,
  color,
}: PagesType) => {
  return (
    <div className={s.pagesContainer}>
      {/* <div className={s.checkboxUnselected}> */}
      <svg width={width} height={height} viewBox={viewBox} fill={color || 'black'} >
        <use xlinkHref={`${sprite}#${arrowID}`} />
      </svg>
      <svg width={width} height={height} viewBox={viewBox} fill={color || 'black'} >
        <use xlinkHref={`${sprite}#${reversedArrowID}`} />
      </svg>
      {/* </div> */}
    </div>
  )
}
