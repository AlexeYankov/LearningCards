import { useState } from 'react'

import { PaginationResponseType } from '@/api/common.api'
import { useGetDecksQuery } from '@/api/decks/decks.api'

import f from './packsPage.module.scss'

import { Pagination } from '../pagination'
import { Table } from '../table'
import { PageBar } from './components/pageBar/pageBar'
import { PageName } from './components/pageName/pageName'
import { tableHeadData } from './tableData'

export const PacksPage = () => {
  const [query, setQuery] = useState<Partial<PaginationResponseType>>({})

  const { data } = useGetDecksQuery(query)

  const handlePaginationChange = (newValues: Partial<PaginationResponseType>) => {
    setQuery({ ...newValues })
  }

  return (
    <>
      <div className={f.container}>
        <PageName handlePaginationChange={handlePaginationChange} />
        <PageBar />
        <Table
          bodyCell={data?.items || []}
          className={f.container__common}
          headCell={tableHeadData}
          tableName={'Decks'}
        />

        <Pagination
          arrowColor={'white'}
          arrowID={'arrow-ios-back'}
          onPaginationChange={handlePaginationChange}
          options={['10', '20', '30', '50', '100']}
          placeholder={'100'}
          reversedArrowID={'arrow-ios-forward'}
          totalPages={data?.pagination?.totalPages || 20}
        />
      </div>
    </>
  )
}
