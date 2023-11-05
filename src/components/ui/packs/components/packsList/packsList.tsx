import { PageName } from '@/components/ui/packs/components/pageName/pageName'
import { PageBar } from '@/components/ui/packs/components/pageBar/pageBar'
import { Table } from '@/components/ui/table'
import { tableBodyData, tableHeadData } from '@/components/ui/packs/tableData'
import { Pagination } from '@/components/ui/pagination'
import s from './packsList.module.scss'
import { useState } from 'react'
import { useGetDecksQuery } from '@/api/decks/decks.api.ts'
import { PaginationResponseType } from '@/api/common.api.ts'

export const PacksList = () => {
  const [query, setQuery] = useState<Partial<PaginationResponseType>>({})

  const { data } = useGetDecksQuery(query)

  const handlePaginationChange = (newValues: Partial<PaginationResponseType>) => {
    setQuery({ ...newValues })
  }

  return (
    <>
      <div className={s.box}>
        <PageName />
        <PageBar />
        <Table
          tableName="Decks"
          headCell={tableHeadData}
          bodyCell={tableBodyData}
          decks={data?.items}
        />
        <Pagination
          onPaginationChange={handlePaginationChange}
          arrowColor="white"
          arrowID="arrow-ios-back"
          options={['10', '20', '30', '50', '100']}
          placeholder="100"
          reversedArrowID="arrow-ios-forward"
        />
      </div>
    </>
  )
}
