import { Typography } from '@/components/ui/typography'
import { Page } from '../page/page'

type PagesForRender = {
  page: number
  pages: number
  setPage: (value: number) => void
}

export const PagesForRender = ({ page, pages, setPage }: PagesForRender) => {
  //@ts-ignore
  const allPages = Array.from({ length: pages }, (v, i) => i + 1)

  delete allPages[0]
  delete allPages[pages - 1]
  const PagesJSX = allPages.map(el => {
    if (el <= 5 && page <= 5) {
      return <Page el={el} key={el} page={page} setPage={setPage} />
    }
    if (el + 5 > pages && page + 5 > pages) {
      return <Page el={el} key={el} page={page} setPage={setPage} />
    }
    if (
      page !== 1 &&
      page + 1 <= el + 2 &&
      el - 3 <= page - 2 &&
      page !== 5 &&
      pages - 4 !== page
    ) {
      return <Page el={el} key={el} page={page} setPage={setPage} />
    }
  })

  return (
    <>
      <Page el={1} page={page} setPage={setPage} />
      {page > 5 && <Typography>...&nbsp;</Typography>}
      {PagesJSX}
      {page + 5 <= pages && <Typography>...&nbsp;</Typography>}
      <Page el={pages} page={page} setPage={setPage} />
    </>
  )
}
