import { useState } from 'react'

import { PaginationResponseType } from '@/api/common.api.ts'
import { useGetDecksQuery } from '@/api/decks/decks.api.ts'
import { PageBar } from '@/components/ui/packs/components/pageBar/pageBar'
import { PageName } from '@/components/ui/packs/components/pageName/pageName'
import { tableHeadData } from '@/components/ui/packs/tableData'
import { Pagination } from '@/components/ui/pagination'
import { Table } from '@/components/ui/table'

import s from './packsList.module.scss'

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
          // bodyCell={tableBodyData}
          decks={data?.items}
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
        />
      </div>
    </>
  )
}
