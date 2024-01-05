import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { changeCurrentPage } from '@/api/decks'
import { useAppDispatch } from '@/api/store'
import { TextField } from '@/components/ui/textField'

import f from '../../cardsPage.module.scss'

type Props = {
  onChange: (value: string) => void
  value: string
}
export const PageBar = ({ onChange, value }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
    dispatch(changeCurrentPage({ currentPage: 1 }))
  }
  const handleClearSearchValueClick = () => {
    onChange('')
  }

  return (
    <div className={f.container__pageBar}>
      <TextField
        inputId={'PageBarSearchCardInput'}
        onChange={handleSearchValue}
        onClearClick={handleClearSearchValueClick}
        placeholder={t('input_search')}
        search
        value={value}
      />
    </div>
  )
}
