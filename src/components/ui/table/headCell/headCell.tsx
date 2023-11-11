import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import { Typography } from '../../typography'
import { HeadCellType } from '../types'
import { useAppDispatch } from '@/api/store'
import { changeOrderBy } from '@/api/decks/pagination.reducer'
import { ArrowUp } from '@/asserts/icons/components/ArrowUp.tsx'

type HeadCellComponentType = {
  el: HeadCellType
  orderBy?: 'name-asc' | 'name-desc'
}

export const HeadCell = ({ el, orderBy }: HeadCellComponentType) => {
  const dispatch = useAppDispatch()

  const handleOrderByChange = () => {
    dispatch(changeOrderBy({ orderBy: orderBy === 'name-desc' ? 'name-asc' : 'name-desc' }))
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
        {el.svgSizes?.id && <ArrowUp />}
      </button>
    </UIHeadCell>
  )
}
