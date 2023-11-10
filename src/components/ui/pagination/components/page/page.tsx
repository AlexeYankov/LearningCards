import s from '../pages/pages.module.scss'
import { Link } from 'react-router-dom'

type PageType = {
  el: number
  page: number
  setPage: (value: number) => void
  getToCurrentPageUrl: (pageValue: number) => { search: string }
}

export const Page = ({ el, page, setPage, getToCurrentPageUrl }: PageType) => {
  return (
    <Link
      className={`${s.page} ${page === el ? s.currentPage : ''}`}
      key={el}
      onClick={() => setPage(el)}
      to={getToCurrentPageUrl(el)}
    >
      {el}
    </Link>
  )
}
