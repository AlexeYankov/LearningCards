import sprite from '@/asserts/sprite.svg'
import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import { Typography } from '../../typography'
import { HeadCellType } from '../types'
import { useAppDispatch } from '@/api/store'
import { changeOrderBy } from '@/api/decks/pagination.reducer'

type HeadCellComponentType = {
  el: HeadCellType
  tableName?: string
  orderBy?: 'name-asc' | 'name-desc'
}

const HeadCell = ({ el, orderBy }: HeadCellComponentType) => {
  const dispatch = useAppDispatch()

  const handleOrderByChange = () => {
    dispatch(changeOrderBy({ orderBy: 'name-desc' }))
    if (orderBy === 'name-desc') {
      dispatch(changeOrderBy({ orderBy: 'name-asc' }))
    }
  }

  return (
    <UIHeadCell className={s.headCell}>
      <Typography variant={'heading3'} className={s.typography}>
        {el.headCellName}
      </Typography>

      <button
        className={`${s.icon} ${orderBy === 'name-asc' ? s.iconRotate : ''}`}
        onClick={handleOrderByChange}
      >
        {el.svgSizes?.id && (
          <svg viewBox={'0 0 24 24'} width={'12px'}>
            <use xlinkHref={`${sprite}#${el.svgSizes?.id}`} />
            123
          </svg>
        )}
      </button>
    </UIHeadCell>
  )
}

export default HeadCell
