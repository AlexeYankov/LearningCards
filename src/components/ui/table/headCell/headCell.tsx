import sprite from '@/asserts/sprite.svg'
import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import { Typography } from '../../typography'
import { HeadCellType } from '../types'

type HeadCellComponentType = {
  el: HeadCellType
  tableName?: string
  isMyDeck?: boolean
}

const HeadCell = ({ el, tableName, isMyDeck }: HeadCellComponentType) => {
  return (
    <UIHeadCell className={`${tableName !== 'Decks' ? s.headCellDecks : s.headCellCards}`}>
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
