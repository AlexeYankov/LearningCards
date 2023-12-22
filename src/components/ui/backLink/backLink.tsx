import s from './backLink.module.scss'
import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@/asserts/icons'

type PropsType = {
  to?: string
  title: string
  onClick?: () => void
}

export const BackLink = ({ to, title, onClick }: PropsType) => {
  return (
    <div className={s.boxLink}>
      <Link className={s.backLink} to={`${to ? `/${to}` : `/`}`} onClick={onClick}>
        <ArrowBackIcon />
        {title}
      </Link>
    </div>
  )
}
