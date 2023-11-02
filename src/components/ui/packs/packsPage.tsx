import f from './packsPage.module.scss'

import { PageName } from './components/pageName/pageName'
import { PageBar } from './components/pageBar/pageBar'
import { Header } from './components/header/header'
import { Table } from '../table'
import { tableHeadData } from './tableData'
import { tableHeadCardsData } from './tableData'
import { tableBodyData } from './tableData'
import { Pagination } from '../pagination'
import { useGetCardsQuery } from '@/api/common.api'

export const PacksPage = () => {
  const cards = useGetCardsQuery('clogyz1ef1b3uvo2qac2uhhsj')
  return (
    <>
      <Header />
      <div className={f.container}>
        <PageName />
        <PageBar />
        {/* <Table
          tableName="Decks"
          headCell={tableHeadData}
          bodyCell={tableBodyData}
          className={f.container__common}
        /> */}
        <Table tableName='NotDecks' headCell={tableHeadCardsData} bodyCell={tableBodyData} className={f.container__common} />
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
