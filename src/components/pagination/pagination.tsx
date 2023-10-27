import s from './pagination.module.scss'

import { Pages } from './components/pages/pages'
import { Select } from '../select/select'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<string>
  pages: number
  placeholder: string
  reversed?: boolean
  reversedArrowID: string
  variant?: string
}

export const Pagination = ({
  arrowColor,
  arrowID,
  options,
  pages,
  placeholder,
  reversed,
  reversedArrowID,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages arrowID={arrowID} color={arrowColor} pages={pages} reversedArrowID={reversedArrowID} />

      <span>Показать&nbsp;</span>
      <Select
        options={options}
        placeholder={placeholder}
        reversed={reversed}
        classname={s.trigger}
      />
      <span>&nbsp;на&nbsp;странице</span>
    </div>
  )
}
