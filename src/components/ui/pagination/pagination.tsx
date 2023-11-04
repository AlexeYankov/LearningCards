import s from './pagination.module.scss'

import { Select } from '../select/select'
import { Pages } from './components/pages/pages'
import { Typography } from '../typography'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<string>
  placeholder: string
  reversed?: boolean
  reversedArrowID: string
  variant?: string
}

export const Pagination = ({
  arrowColor,
  arrowID,
  options,
  placeholder,
  reversed,
  reversedArrowID,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages arrowID={arrowID} color={arrowColor} reversedArrowID={reversedArrowID} />

      <div className={s.paginationContainer}>
        <Typography variant="body2">Показать</Typography>

        <Select
          classname={s.trigger}
          options={options}
          placeholder={placeholder}
          reversed={reversed}
        />

        <Typography variant="body2">на странице</Typography>
      </div>
    </div>
  )
}
