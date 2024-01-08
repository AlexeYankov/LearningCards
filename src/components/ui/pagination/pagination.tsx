import { useTranslation } from 'react-i18next'

import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

import { Pages } from './components/pages'

export type LocationType = 'cards' | 'decks'

type Props = {
  arrowColor: string
  arrowID: string
  location: LocationType
  reversed?: boolean
  reversedArrowID: string
  totalItems: number
  totalPages: number
  variant?: string
}

export const Pagination = ({
  arrowColor,
  arrowID,
  location,
  reversed,
  reversedArrowID,
  totalItems,
  totalPages,
}: Props) => {
  const { t } = useTranslation()

  const generateOptions = (total: number) => {
    const dynamicOptions: number[] = []

    for (let i = 10; i <= total && i <= 100; i += 10) {
      if (i !== 40 && i !== 60 && i !== 70 && i !== 80 && i !== 90) {
        dynamicOptions.push(i)
      }
    }

    return dynamicOptions.map(option => option.toString())
  }

  const options =
    totalItems! <= 100 ? generateOptions(totalItems!) : ['10', '20', '30', '50', '100']

  return (
    <div className={s.paginationContainer}>
      <Pages
        arrowID={arrowID}
        color={arrowColor}
        location={location}
        reversedArrowID={reversedArrowID}
        totalPages={totalPages}
      />
      <div className={s.box}>
        <Typography variant={'body2'}>{t('show_page')}</Typography>
        <Select classname={s.select} options={options} reversed={reversed} />
        <Typography className={s.typography} variant={'body2'}>
          {t('on_page')}
        </Typography>
      </div>
    </div>
  )
}
