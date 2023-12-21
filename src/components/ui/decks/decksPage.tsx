import { changeCurrentPage, changeItemsPerPage, useGetDecksQuery } from '@/api/decks'
import s from './decksPage.module.scss'
import { Pagination } from '../pagination'
import { DecksBody, DecksHead, DecksPageBar, DecksPageName } from './components'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { useEffect } from 'react'
import { Root } from '@it-incubator/ui-kit'
import { useSearchParams } from 'react-router-dom'
import { ErrorComponent } from '@/utils/toastify/Error'
import { Sort } from './decksData'

export const DecksPage = () => {
  const dispatch = useAppDispatch()
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
    isError,
    error,
  } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    authorId,
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
      // Обновление значения currentPage в URL при каждом изменении
      setSearchParams({ ...searchParams, page: String(currentPage) })
    }
  }, [currentPage, decks?.pagination?.totalItems, dispatch, setSearchParams, searchParams])
  return (
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
        </>
      )}
    </div>
  )
}
