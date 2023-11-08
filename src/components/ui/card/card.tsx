import { ReactNode } from 'react'

import s from './card.module.scss'

type Props = {
  children?: ReactNode
  className?: string
  photo?: string
  withProps?: boolean
}
export const Card = ({ children, className, photo, withProps }: Props) => {
  return (
    <div className={`${s.card} ${className}`}>
      {children}
      {withProps ? <img alt={'photo'} className={s.photo} src={photo} /> : ''}
    </div>
  )
}
