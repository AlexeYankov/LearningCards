import sprite from '@/asserts/sprite.svg'
import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import { Typography } from '../../typography'
import { HeadCellType } from '../types'

type HeadCellcomponentType = {
  el: HeadCellType
  tableName?: string
}

const HeadCell = ({ el, tableName }: HeadCellcomponentType) => {
  return (
    <UIHeadCell
      className={tableName !== 'Cards' && el.headCellName === 'Grade' ? s.headCellLast : s.headCell}
      style={tableName !== 'Decks' ? { width: '300px' } : { width: '200px' }}
    >
      <Typography variant={'heading3'}>{el.headCellName}</Typography>

      {el.svgSizes?.id && (
        <div>
          <svg viewBox={'0 0 24 24'} width={'12px'}>
            <use xlinkHref={`${sprite}#${el.svgSizes?.id}`} />
          </svg>
        </div>
      )}
    </UIHeadCell>
  )
}

export default HeadCell
