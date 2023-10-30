import s from './pagination.module.scss'

import { Select } from '../select/select'
import { Pages } from './components/pages/pages'
import { Typography } from '../typography'

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

      <Typography>Показать&nbsp;</Typography>
      <Select
        classname={s.trigger}
        options={options}
        placeholder={placeholder}
        reversed={reversed}
      />
      <Typography>&nbsp;на&nbsp;странице</Typography>
    </div>
  )
}
