import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import {
  changeCurrentPage,
  changeMaxCardsCount,
  changeMinCardsCount,
  resetFilter,
  searchDeckByName,
} from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { DeleteIcon } from '@/asserts/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useDebounce } from '@/hooks/useDebounce'

import f from '../../decksPage.module.scss'

export const DecksPageBar = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { t } = useTranslation()

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
          inputId={'searchInputDecks'}
          onChange={handleSearchValue}
          onClearClick={handleClearSearchValueClick}
          placeholder={t('input_search')}
          search
          value={searchValue || ''}
        />
      </div>

      <div>
        <Typography variant={'body2'}>{t('show_decks_cards')}</Typography>
        <Tabs title={[t('my_decks'), t('all_decks')]} />
      </div>

      <div className={f.pagebar__box_slider}>
        <Typography className={f.typography__slider} variant={'body2'}>
          {t('number_cards')}
        </Typography>
        <Slider />
      </div>
      <div>
        <Button
          className={f.button}
          icon={<DeleteIcon />}
          onClick={handleResetFilter}
          variant={'secondary'}
        >
          <Typography variant={'body2'}>{t('clear_filter')}</Typography>
        </Button>
      </div>
    </div>
  )
}
