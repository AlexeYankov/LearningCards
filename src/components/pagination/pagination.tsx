import s from './pagination.module.scss'

import { Pages } from './components/pages/pages'
import SelectDemo from './components/select/selectComponent'

type PaginationType = {
  arrowColor: string
  arrowID: string
  pages: number
  reversedArrowID: string
  variant?: string
  options: Array<number>
  placeholder: number
}

export const Pagination = ({
  options,
  placeholder,
  arrowColor,
  arrowID,
  pages,
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
