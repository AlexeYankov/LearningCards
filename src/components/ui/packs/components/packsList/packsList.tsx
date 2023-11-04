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
  const [query, setQuery] = useState<any>(undefined)

  const { data } = useGetDecksQuery(query)

  const { currentPage, totalPages }: PaginationResponseType = {
    currentPage: data?.pagination?.currentPage || 1,
    itemsPerPage: data?.pagination?.itemsPerPage || 10,
    totalItems: data?.pagination?.totalItems || 100,
    totalPages: data?.pagination?.totalPages || 20,
  }

  const handlePaginationClick = (page: number) => {
    setQuery({ currentPage: page })
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPaginationClick={handlePaginationClick}
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
