import f from './packsPage.module.scss'

import { PageName } from './components/pageName/pageName'
import { PageBar } from './components/pageBar/pageBar'
import { Table } from '../table'
import { tableBodyData, tableHeadCardsData } from './tableData'
import { Pagination } from '../pagination'
import { FC } from 'react'

type PacksPageType = {
  pagination: any
}

export const PacksPage: FC<PacksPageType> = ({ pagination }) => {
  return (
    <>
      <div className={f.container}>
        <PageName />
        <PageBar />
        {/* <Table
          tableName="Decks"
          headCell={tableHeadData}
          bodyCell={tableBodyData}
          className={f.container__common}
        /> */}
        <Table
          tableName="NotDecks"
          headCell={tableHeadCardsData}
          bodyCell={tableBodyData}
          className={f.container__common}
        />
        <Pagination
          arrowColor="white"
          arrowID="arrow-ios-back"
          options={['10', '20', '30', '50', '100']}
          pagination={pagination}
          placeholder="100"
          reversedArrowID="arrow-ios-forward"
        />
      </div>
    </>
  )
}
