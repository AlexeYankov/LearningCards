import { DeleteIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import f from '../../decksPage.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/api/store'
import {
  changeCurrentPage,
  changeMaxCardsCount,
  changeMinCardsCount,
  resetFilter,
  searchDeckByName,
} from '@/api/decks'
import { useDebounce } from '@/hooks/useDebounce'
import { useLocation } from 'react-router-dom'

export const DecksPageBar = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)
  const searchValueLocation = urlParams.get('search')

  const savedSearchValue = localStorage.getItem('searchValue')
  const name = useAppSelector(state => state.decks.name)

  const [searchValue, setSearchValue] = useState(searchValueLocation || savedSearchValue)

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
    const newSearchValue = e.currentTarget.value
    setSearchValue(newSearchValue)
    localStorage.setItem('page', '1')
    localStorage.setItem('searchValue', newSearchValue)
    dispatch(changeCurrentPage({ currentPage: 1 }))
  }

  const handleClearSearchValueClick = () => {
    setSearchValue('')
    dispatch(searchDeckByName({ name: '' }))
    localStorage.removeItem('searchValue')
    dispatch(changeCurrentPage({ currentPage: 1 }))
    dispatch(changeMinCardsCount({ minCardsCount: 0 }))
    dispatch(changeMaxCardsCount({ maxCardsCount: 61 }))
  }

  const handleResetFilter = () => {
    handleClearSearchValueClick()
    dispatch(resetFilter())
  }

  useEffect(() => {
    if (name === '' && savedSearchValue === null) {
      setSearchValue('')
    }
  }, [name])

  return (
    <div className={f.container__pageBar}>
      <div>
        <TextField
          className={f.container__textField}
          placeholder={'Input search'}
          search
          onClearClick={handleClearSearchValueClick}
          value={searchValue!}
          onChange={handleSearchValue}
        />
      </div>

      <div>
        <Label label={'Show decks cards'} />
        <Tabs title={['My Decks', 'All Decks']} />
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
