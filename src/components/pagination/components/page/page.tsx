import s from '../pages/pages.module.scss'

type PageType = {
  el: number
  page: number
  setPage: (value: number) => void
}

export const Page = ({ el, page, setPage }: PageType) => {
  return (
    <button
      className={`${s.page} ${page === el ? s.currentPage : ''}`}
      key={crypto.randomUUID()}
      onClick={() => setPage(el)}
    >
      {el}
    </button>
  )
}
