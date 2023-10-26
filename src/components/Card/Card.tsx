import s from './Card.module.scss'

type Props = {
  photo: string
  withProps: boolean
}
export const Card = ({ photo, withProps }: Props) => {
  return (
    <div className={s.card}>
      {withProps ? <img alt={'photo'} className={s.photo} src={photo} /> : ''}
    </div>
  )
}
