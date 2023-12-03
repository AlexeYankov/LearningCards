import { DeleteIcon } from '@/asserts/icons/components/DeleteIcon.tsx'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../decksPage.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '@/api/store.ts'
import {
  changeCurrentPage,
  changeMaxCardsCount,
  changeMinCardsCount,
  resetFilter,
  searchDeckByName,
} from '@/api/decks/pagination.reducer'
import { useDebounce } from '@/hooks/useDebounce'

export const DecksPageBar = () => {
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(searchDeckByName({ name: debouncedSearchValue }))
      dispatch(changeCurrentPage({ currentPage: 1 }))
      dispatch(changeMinCardsCount({ minCardsCount: 0 }))
      dispatch(changeMaxCardsCount({ maxCardsCount: 61 }))
    }
  }, [debouncedSearchValue, dispatch])

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const handleClearSearchValueClick = () => {
    setSearchValue('')
    dispatch(searchDeckByName({ name: '' }))
  }

  const handleResetFilter = () => {
    handleClearSearchValueClick()
    dispatch(resetFilter())
  }

  return (
    <div className={f.container__pageBar}>
      <div>
        <TextField
          className={f.container__textField}
          placeholder={'Input search'}
          search
          onClearClick={handleClearSearchValueClick}
          value={searchValue}
          onChange={handleSearchValue}
        />
      </div>

      <div>
        <Label label={'Show decks cards'} />
        <Tabs title={['My Cards', 'All Cards']} />
      </div>

      <div style={{ position: 'relative', maxWidth: '250px', width: '100%' }}>
        <Label label={'Number of cards'} style={{ position: 'absolute', top: '-25px' }} />
        <Slider />
      </div>
      <div>
        <Button
          className={f.button}
          icon={<DeleteIcon />}
          variant={'secondary'}
          onClick={handleResetFilter}
        >
          <Typography variant={'body2'}>Clear Filter</Typography>
        </Button>
      </div>
    </div>
  )
}
