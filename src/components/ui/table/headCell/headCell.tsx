import { ComponentProps, FC } from 'react'
import s from './headCell.module.scss'

export type HeadCellProps = ComponentProps<'th'> & {
  sortable?: boolean
}

export const HeadCell: FC<HeadCellProps> = ({ className, children, sortable, ...rest }) => {
  return (
    <th className={`${s.headCell} ${className}`} {...rest}>
      <span>{children}</span>
    </th>
  )
}
