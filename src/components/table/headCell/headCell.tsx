import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import sprite from '../../../asserts/sprite.svg'
import { HeadCellType } from '../types'

type HeadCellcomponentType = {
  el: HeadCellType
  padding?: string
  width?: string
}

const HeadCell = ({ el, padding, width }: HeadCellcomponentType) => {
  return (
    <UIHeadCell className={s.headCell} style={{ padding: `${padding}`, width: `${width}` }}>
      <span>{el.headCellName}</span>

      {el.svgSizes?.id && (
        <div style={{ margin: '0px', padding: '0px', width: `${el.svgSizes?.width}` }}>
          <svg
            height={el.svgSizes?.height}
            viewBox={el.svgSizes?.viewBox || '0 0 24 24'}
            width={el.svgSizes?.width}
          >
            <use xlinkHref={`${sprite}#${el.svgSizes?.id}`} />
          </svg>
        </div>
      )}
    </UIHeadCell>
  )
}

export default HeadCell
