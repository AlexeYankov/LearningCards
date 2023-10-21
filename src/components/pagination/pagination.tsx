import s from './pagination.module.scss'

import { Pages } from './components/pages/pages'
import SelectDemo from './components/select/selectComponent'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<number>
  pages: number
  placeholder: number
  reversedArrowID: string
  variant?: string
}

export const Pagination = ({
  arrowColor,
  arrowID,
  options,
  pages,
  placeholder,
  reversedArrowID,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages arrowID={arrowID} color={arrowColor} pages={pages} reversedArrowID={reversedArrowID} />

      <span>Показать&nbsp;</span>
      <SelectDemo options={options} placeholder={placeholder} />
      <span>&nbsp;на&nbsp;странице</span>
    </div>
  )
}
