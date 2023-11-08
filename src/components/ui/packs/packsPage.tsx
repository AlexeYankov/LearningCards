import { useEffect } from 'react'
import { useGetDecksQuery } from '@/api/decks/decks.api'

import f from './packsPage.module.scss'

import { Pagination } from '../pagination'
import { Table } from '../table'
import { PageBar } from './components/pageBar/pageBar'
import { PageName } from './components/pageName/pageName'
import { tableHeadData } from './tableData'
import { useAppSelector } from '@/api/store'

export const PacksPage = () => {
  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const maxCardsCount = useAppSelector(state => state.pagination.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.pagination.minCardsCount)

  const { data } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
  })

  useEffect(() => {}, [data])

  return (
    <>
      <div className={f.container}>
        <PageName />
        <PageBar />
        <Table
          bodyCell={data?.items}
          className={f.container__common}
          headCell={tableHeadData}
          tableName={'Decks'}
        />

        <Pagination
          arrowColor={'white'}
          arrowID={'arrow-ios-back'}
          options={['10', '20', '30', '50', '100']}
          placeholder={'100'}
          reversedArrowID={'arrow-ios-forward'}
          totalPages={data?.pagination?.totalPages}
        />
      </div>
    </>
  )
}
