import { useGetDecksQuery } from '@/api/decks/decks.api'

import f from './packsPage.module.scss'

import { Pagination } from '../pagination'
import { Table } from '../table'
import { PageBar } from './components/pageBar/pageBar'
import { PageName } from './components/pageName/pageName'
import { tableHeadData } from './tableData'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { useEffect } from 'react'
import { changeCurrentPage } from '@/api/decks/pagination.reducer'

export const PacksPage = () => {
  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)
  const authorId = useAppSelector(state => state.pagination.authorId)
  const name = useAppSelector(state => state.pagination.name)
  const orderBy = useAppSelector(state => state.pagination.orderBy)

  const { data } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    authorId,
    name,
    orderBy,
  })

  useEffect(() => {
    const savedCurrentPage = localStorage.getItem('page')
    if (savedCurrentPage) {
      dispatch(changeCurrentPage({ currentPage: parseInt(savedCurrentPage) }))
    } else {
      dispatch(changeCurrentPage({ currentPage: 1 }))
    }
  }, [])

  return (
    <div className={f.container}>
      <PageName />
      <PageBar />
      <Table
        bodyCell={data?.items}
        className={f.container__common}
        headCell={tableHeadData}
        tableName={'Decks'}
        isMyDeck={false}
      />

      <Pagination
        reversed
        arrowColor={'white'}
        arrowID={'arrow-ios-back'}
        options={['10', '20', '30', '50', '100']}
        placeholder={'100'}
        reversedArrowID={'arrow-ios-forward'}
        totalPages={data?.pagination?.totalPages}
      />
    </div>
  )
}
