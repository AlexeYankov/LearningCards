import s from '../pages/pages.module.scss'

type PageType = {
  el: number
  page: number
  setPage: (value: number) => void
}

export const Page = ({ el, page, setPage }: PageType) => {
  return (
    <div
      className={`${s.page} ${page === el ? s.currentPage : ''}`}
      key={el}
      onClick={() => setPage(el)}
    >
      {el}
    </div>
  )
}
