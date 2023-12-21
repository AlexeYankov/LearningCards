import { TextField } from '@/components/ui/textField'
import f from '../../cardsPage.module.scss'
import { ChangeEvent } from 'react'
import { useAppDispatch } from '@/api/store.ts'
import { changeCurrentPage } from '@/api/decks'

type Props = {
  onChange: (value: string) => void
  value: string
}
export const PageBar = ({ onChange, value }: Props) => {
  const dispatch = useAppDispatch()

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
        placeholder={'Input search'}
        search
      />
    </div>
  )
}
