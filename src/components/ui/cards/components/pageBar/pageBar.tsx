import { TextField } from '@/components/ui/textField'
import f from '../../cardsPage.module.scss'
import { ChangeEvent } from 'react'
import { useAppDispatch } from '@/api/store.ts'
import { changeCurrentPage } from '@/api/decks'
import { useTranslation } from 'react-i18next'

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
        value={value}
        onChange={handleSearchValue}
        onClearClick={handleClearSearchValueClick}
        placeholder={t('input_search')}
        search
      />
    </div>
  )
}
