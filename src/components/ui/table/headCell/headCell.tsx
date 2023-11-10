import sprite from '@/asserts/sprite.svg'
import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import { Typography } from '../../typography'
import { HeadCellType } from '../types'

type HeadCellComponentType = {
  el: HeadCellType
  tableName?: string
}

const HeadCell = ({ el }: HeadCellComponentType) => {
  return (
    <UIHeadCell className={s.headCell}>
      <Typography variant={'heading3'} className={s.typography}>
        {el.headCellName}
      </Typography>

      <span className={s.icon}>
        {el.svgSizes?.id && (
          <svg viewBox={'0 0 24 24'} width={'12px'}>
            <use xlinkHref={`${sprite}#${el.svgSizes?.id}`} />
          </svg>
        )}
      </span>
    </UIHeadCell>
  )
}

export default HeadCell
