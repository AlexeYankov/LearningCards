import s from './pagination.module.scss'

import { Pages } from './components/pages/pages'

type PaginationType = {
  arrowColor: string
  arrowID: string
  reversedArrowID: string
  pages: number
  variant?: string
}

export const Pagination = ({ arrowColor, arrowID, reversedArrowID, pages }: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages arrowID={arrowID} pages={pages} color={arrowColor} reversedArrowID={reversedArrowID} />
    </div>
  )
}
