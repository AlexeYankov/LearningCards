import s from './pagination.module.scss'

import { Select } from '../select/select'
import { Typography } from '../typography'
import { PaginationResponseType } from '@/api/common.api.ts'
import { Pages } from './components/pages/pages'

type PaginationType = {
  arrowColor: string
  arrowID: string
  options: Array<string>
  placeholder: string
  reversed?: boolean
  reversedArrowID: string
  variant?: string
  totalPages?: number
  onPaginationChange: (value: Partial<PaginationResponseType>) => void
}

export const Pagination = ({
  arrowColor,
  arrowID,
  options,
  placeholder,
  reversed,
  totalPages,
  onPaginationChange,
  reversedArrowID,
}: PaginationType) => {
  return (
    <div className={s.paginationContainer}>
      <Pages
        arrowID={arrowID}
        color={arrowColor}
        reversedArrowID={reversedArrowID}
        totalPages={totalPages}
        onPaginationClick={onPaginationChange}
      />

      <div className={s.paginationContainer}>
        <Typography variant={'body2'}>Показать</Typography>

        <Select
          classname={s.trigger}
          options={options}
          placeholder={placeholder}
          reversed={reversed}
          onSelectChange={onPaginationChange}
        />

        <Typography variant={'body2'}>на странице</Typography>
      </div>
    </div>
  )
}
