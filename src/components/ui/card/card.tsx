import s from './card.module.scss'
import { ReactNode } from 'react'

type Props = {
  photo?: string
  withProps?: boolean
  className?: string
  children?: ReactNode
}
export const Card = ({ photo, withProps, className, children }: Props) => {
  return (
    <div className={`${s.card} ${className}`}>
      {children}
      {withProps ? <img alt={'photo'} className={s.photo} src={photo} /> : ''}
    </div>
  )
}
