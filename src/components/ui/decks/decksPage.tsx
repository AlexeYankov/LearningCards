import { useGetDecksQuery } from '@/api/decks/decks.api'

import s from './decksPage.module.scss'

import { Pagination } from '../pagination'
import { DecksPageBar } from './components/decksPageBar/decksPageBar'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { useEffect } from 'react'
import { changeCurrentPage } from '@/api/decks/pagination.reducer'
import { Root } from '@it-incubator/ui-kit'
import { Sort } from '@/components/ui/table/types.ts'
import { DecksPageName } from '@/components/ui/decks/components/decksPageName/decksPageName.tsx'
import { DecksHead } from '@/components/ui/decks/components/decksHead/decksHead.tsx'
import { DecksBody } from '@/components/ui/decks/components/decksBody/decksBody.tsx'

export const DecksPage = () => {
  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)
  const sort = useAppSelector(state => state.pagination.sort)
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)
  const authorId = useAppSelector(state => state.pagination.authorId)
  const name = useAppSelector(state => state.pagination.name)

  const { data: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    authorId,
    name,
    orderBy: sort?.direction as Sort,
  })

  useEffect(() => {
    const savedCurrentPage = localStorage.getItem('page')
    dispatch(changeCurrentPage({ currentPage: parseInt(savedCurrentPage!, 10) || 1 }))
  }, [])

  return (
    <div className={s.container}>
      <DecksPageName />
      <DecksPageBar />
      <Root className={s.container__common}>
        <DecksHead />
        <DecksBody decks={decks} />
      </Root>
      <Pagination
        reversed
        arrowColor={'white'}
        arrowID={'arrow-ios-back'}
        reversedArrowID={'arrow-ios-forward'}
        totalPages={decks?.pagination?.totalPages}
        totalItems={decks?.pagination?.totalItems}
      />
    </div>
  )
}
