import {useGetDecksQuery} from '@/api/decks/decks.api'

import s from './decksPage.module.scss'

import { Pagination } from '../pagination'
import { DecksPageBar } from './components/decksPageBar'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { useEffect } from 'react'
import { changeCurrentPage, changeItemsPerPage } from '@/api/decks/decks.reducer.ts'
import { Root } from '@it-incubator/ui-kit'
import { Sort } from '@/components/ui/table/types'
import { DecksPageName } from './components/decksPageName'
import { DecksHead } from './components/decksHead'
import { DecksBody } from './components/decksBody'

export const DecksPage = () => {
  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const sort = useAppSelector(state => state.decks.sort)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const maxCardsCount = useAppSelector(state => state.decks.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.decks.minCardsCount)
  const authorId = useAppSelector(state => state.decks.authorId)
  const name = useAppSelector(state => state.decks.name)

  const { data: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    authorId,
    name,
    orderBy: sort?.direction as Sort,
  })

  const isShowPagination = decks?.pagination?.totalItems! >= 10

  useEffect(() => {
    const savedCurrentPage = localStorage.getItem('page')
    dispatch(changeCurrentPage({ currentPage: parseInt(savedCurrentPage!, 10) || 1 }))

    const totalItems = decks?.pagination?.totalItems

    if (totalItems) {
      dispatch(changeItemsPerPage({ itemsPerPage: 10 }))
      dispatch(changeCurrentPage({ currentPage: 1 }))
    }
  }, [decks?.pagination?.totalItems, dispatch])
  return (
    <div className={s.container}>
      <DecksPageName />
      <DecksPageBar />
      <Root className={s.container__common}>
        <DecksHead />
        <DecksBody decks={decks} />
      </Root>
      {isShowPagination && decks?.pagination?.totalItems! > 10 && (
        <Pagination
          reversed
          arrowColor="white"
          arrowID="arrow-ios-back"
          reversedArrowID="arrow-ios-forward"
          totalPages={decks?.pagination.totalPages!}
          totalItems={decks?.pagination.totalItems!}
        />
      )}
    </div>
  )
}
