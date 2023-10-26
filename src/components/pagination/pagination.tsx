import s from './pagination.module.scss'

import { Pages } from './components/pages/pages'
import { Select } from '../select/select'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<string>
  pages: number
  placeholder: string
  width?: string
  padding?: string
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
  padding,
  placeholder,
  reversed,
  reversedArrowID,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages arrowID={arrowID} color={arrowColor} pages={pages} reversedArrowID={reversedArrowID} />

      <span>Показать&nbsp;</span>
      <Select options={options} placeholder={placeholder} width={width} reversed={reversed} padding={padding}  />
      <span>&nbsp;на&nbsp;странице</span>
    </div>
  )
}
