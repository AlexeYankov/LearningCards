import f from './packsPage.module.scss'

import { PageName } from './components/pageName/pageName'
import { PageBar } from './components/pageBar/pageBar'
import { Header } from './components/header/header'
import { Table } from '../table'
import { tableHeadData } from './tableData'
import { Pagination } from '../pagination'
import { useGetDecksQuery } from '@/api/common.api'

export const PacksPage = () => {
  const { data } = useGetDecksQuery()

  return (
    <>
      <Header />
      <div className={f.container}>
        <PageName />
        <PageBar />
        <Table
          tableName="Decks"
          headCell={tableHeadData}
          bodyCell={data?.items || []}
          className={f.container__common}
        />

        <Pagination
          arrowColor="white"
          arrowID="arrow-ios-back"
          options={['10', '20', '30', '50', '100']}
          pages={17}
          placeholder="100"
          reversedArrowID="arrow-ios-forward"
        />
      </div>
    </>
  )
}
