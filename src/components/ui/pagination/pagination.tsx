import s from './pagination.module.scss'

import { Select } from '../select/select'
import { Typography } from '../typography'
import { Pages } from './components/pages/pages'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<string>
  placeholder: string
  reversed?: boolean
  reversedArrowID: string
  totalPages?: number
  variant?: string
}

export const Pagination = ({
  arrowColor,
  arrowID,
  options,
  placeholder,
  reversed,
  reversedArrowID,
  totalPages,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages
        arrowID={arrowID}
        color={arrowColor}
        reversedArrowID={reversedArrowID}
        totalPages={totalPages}
      />

      <div className={s.paginationContainer}>
        <Typography variant={'body2'}>Показать</Typography>

        <Select
          classname={s.trigger}
          options={options}
          placeholder={placeholder}
          reversed={reversed}
        />

        <Typography variant={'body2'}>на странице</Typography>
      </div>
    </div>
  )
}
