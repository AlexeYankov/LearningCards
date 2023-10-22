import s from './pagination.module.scss'

import { Pages } from './components/pages/pages'
import SelectRadix from './components/select/selectComponent'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<number>
  pages: number
  placeholder: number
  width?: string
  reversed?: boolean
  reversedArrowID: string
  variant?: string
}

export const Pagination = ({
  arrowColor,
  arrowID,
  options,
  pages,
  width,
  placeholder,
  reversed,
  reversedArrowID,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages arrowID={arrowID} color={arrowColor} pages={pages} reversedArrowID={reversedArrowID} />

      <span>Показать&nbsp;</span>
      <SelectRadix options={options} placeholder={placeholder} width={width} reversed={reversed}/>
      <span>&nbsp;на&nbsp;странице</span>
    </div>
  )
}
