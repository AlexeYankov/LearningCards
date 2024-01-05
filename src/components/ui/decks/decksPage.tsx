import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import {
  changeCurrentPage,
  changeItemsPerPage,
  searchDeckByName,
  useGetDecksQuery,
} from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { Progress } from '@/components/ui/loader'
import { Sort } from '@/types/decks'
import { ErrorComponent } from '@/utils/toastify/Error'
import { Root } from '@it-incubator/ui-kit'

import s from './decksPage.module.scss'

import { Pagination } from '../pagination'
import { DecksBody, DecksHead, DecksPageBar, DecksPageName } from './components'

export const DecksPage = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const sort = useAppSelector(state => state.decks.sort)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const maxCardsCount = useAppSelector(state => state.decks.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.decks.minCardsCount)
  const authorId = useAppSelector(state => state.decks.authorId)
  const name = useAppSelector(state => state.decks.name)

  const {
    data: decks,
    error,
    isError,
    isFetching,
  } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    name,
    orderBy: sort?.direction as Sort,
  })
  const isShowPagination = decks?.pagination?.totalItems! >= itemsPerPage
  const isDecksEmpty = decks?.pagination?.totalItems === 0

  useEffect(() => {
    const savedCurrentPage = localStorage.getItem('page')

    dispatch(changeCurrentPage({ currentPage: parseInt(savedCurrentPage!, 10) || 1 }))

    const totalItems = decks?.pagination?.totalItems

    if (totalItems) {
      dispatch(changeItemsPerPage({ itemsPerPage: 10 }))

      if (name !== '') {
        setSearchParams({ ...searchParams, page: String(currentPage), search: name })
      } else {
        setSearchParams({ ...searchParams, page: String(currentPage) })
      }
    }
  }, [currentPage, decks?.pagination?.totalItems, dispatch, setSearchParams, searchParams, name])

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue')
    const urlParams = new URLSearchParams(location.search)
    const searchValue = urlParams.get('search')

    if (searchValue) {
      dispatch(searchDeckByName({ name: searchValue }))
    } else if (savedSearchValue) {
      dispatch(searchDeckByName({ name: savedSearchValue }))
    } else {
      dispatch(searchDeckByName({ name: '' }))
    }
  }, [dispatch, location.search])

  return (
    <>
      {isFetching && <Progress />}

      <div className={s.container}>
        <ErrorComponent error={error} isError={isError} />
        <DecksPageName />
        <DecksPageBar />
        {isDecksEmpty ? (
          <div className={s.decksEmpty}>No content with these terms...</div>
        ) : (
          <>
            <Root className={s.container__common}>
              <DecksHead />
              <DecksBody decks={decks} isFetching={isFetching} />
            </Root>
            {isShowPagination && decks?.pagination?.totalItems! > 10 && (
              <Pagination
                arrowColor={'white'}
                arrowID={'arrow-ios-back'}
                location={'decks'}
                reversed
                reversedArrowID={'arrow-ios-forward'}
                totalItems={decks?.pagination.totalItems!}
                totalPages={decks?.pagination.totalPages!}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
