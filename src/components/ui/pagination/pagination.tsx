import { PaginationResponseType } from '@/api/common.api.ts'

import s from './pagination.module.scss'

import { Select } from '../select/select'
import { Typography } from '../typography'
import { Pages } from './components/pages/pages'

type PaginationType = {
  arrowColor: string
  arrowID: string
  onPaginationChange: (value: Partial<PaginationResponseType>) => void
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
  onPaginationChange,
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
        onPaginationClick={onPaginationChange}
        reversedArrowID={reversedArrowID}
        totalPages={totalPages}
      />

      <div className={s.paginationContainer}>
        <Typography variant={'body2'}>Показать</Typography>

        <Select
          classname={s.trigger}
          onSelectChange={onPaginationChange}
          options={options}
          placeholder={placeholder}
          reversed={reversed}
        />

        <Typography variant={'body2'}>на странице</Typography>
      </div>
    </div>
  )
}
