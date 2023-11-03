import { PageName } from '@/components/ui/packs/components/pageName/pageName'
import { PageBar } from '@/components/ui/packs/components/pageBar/pageBar'
import { Table } from '@/components/ui/table'
import { tableBodyData, tableHeadData } from '@/components/ui/packs/tableData'
import { Pagination } from '@/components/ui/pagination'
import s from './packsList.module.scss'
import { useGetDecksQuery } from '@/api/decks/decks.api'

export const PacksList = () => {
  const { data } = useGetDecksQuery({ itemsPerPage: 5 })

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
          totalItems={data?.pagination?.totalItems}
        />
        <Pagination
          pagination={data?.pagination}
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
