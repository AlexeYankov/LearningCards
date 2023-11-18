import { HeadCell as UIHeadCell } from '@it-incubator/ui-kit'

import s from './headCell.module.scss'

import { Typography } from '../../typography'
import { HeadCellType } from '../types'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { changeOrderBy } from '@/api/decks/pagination.reducer'
import { ArrowUp } from '@/asserts/icons/components/ArrowUp'

type HeadCellComponentType = {
  el: HeadCellType
}

export const HeadCell = ({ el }: HeadCellComponentType) => {
  const dispatch = useAppDispatch()
  const orderBy = useAppSelector(state => state.pagination.orderBy)

  const handleOrderByChange = () => {
    const updatedOrderBy = orderBy === 'name-desc' ? 'name-asc' : 'name-desc'
    dispatch(changeOrderBy({ orderBy: updatedOrderBy }))
  }

  const iconClasses = `${s.icon} ${orderBy === 'name-desc' ? s.iconRotate : ''}`

  return (
    <UIHeadCell className={s.headCell}>
      <Typography variant={'heading3'} className={s.typography}>
        {el.headCellName}
      </Typography>
      <button className={iconClasses} onClick={handleOrderByChange}>
        {el.svgSizes && <ArrowUp />}
      </button>
    </UIHeadCell>
  )
}
