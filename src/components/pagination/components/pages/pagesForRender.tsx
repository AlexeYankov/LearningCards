import { Page } from '../page/page'

type PagesForRender = {
  pages: number
  page: number
  setPage: (value: number) => void
}

export const PagesForRender = ({ pages, page, setPage }: PagesForRender) => {
  const allPages = Array.from({ length: pages }, (v, i) => i + 1)
  delete allPages[0]
  delete allPages[pages - 1]
  const PagesJSX = allPages.map(el => {
    if (1 === page && el <= 5) {
      return <Page el={el} page={page} setPage={setPage} />
    }
    if (page !== 1 && page + 1 <= el + 2 && el - 3 <= page - 2) {
      return <Page el={el} page={page} setPage={setPage} />
    }
  })
  return (
    <>
      <Page el={1} page={page} setPage={setPage} />
      {page > 2 ? <span>...&nbsp;</span> : ''}
      {PagesJSX}
      {pages > 5 && pages !== page && page + 1 !== pages && <span>...&nbsp;</span>}
      <Page el={pages} page={page} setPage={setPage} />
    </>
  )
}
