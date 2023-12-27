import s from './pagination.module.scss'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { Pages } from './components/pages'
import { useTranslation } from 'react-i18next'

export type LocationType = 'decks' | 'cards'

type PaginationType = {
  arrowColor: string
  arrowID: string
  reversed?: boolean
  reversedArrowID: string
  totalPages: number
  variant?: string
  totalItems: number
  location: LocationType
}

export const Pagination = ({
  arrowColor,
  arrowID,
  reversed,
  reversedArrowID,
  totalItems,
  totalPages,
  location,
}: PaginationType) => {
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
        reversedArrowID={reversedArrowID}
        totalPages={totalPages}
        location={location}
      />
      <div className={s.box}>
        <Typography variant={'body2'}>{t('show_page')}</Typography>
        <Select classname={s.select} options={options} reversed={reversed} />
        <Typography variant={'body2'} className={s.typography}>
          {t('on_page')}
        </Typography>
      </div>
    </div>
  )
}
