import { useParams } from 'react-router-dom'

import { useGetCardsQuery } from '@/api/common.api'

import f from './cardsPage.module.scss'
import { Table } from '../table'
import { PageBar } from './components/pageBar/pageBar'
import { PageName } from './components/pageName/pageName'
import { tableHeadCardsData } from './tableData'

export const CardsPage = () => {
  const { id } = useParams()
  const { data } = useGetCardsQuery(`${id}`)

  return (
    <div className={f.container}>
      <PageName />
      <PageBar />

      <Table
        bodyCell={data?.items || []}
        className={f.container__common}
        headCell={tableHeadCardsData}
        tableName={'Cards'}
      />
      {/* <Pagination
          arrowColor={'white'}
          arrowID={'arrow-ios-back'}
          options={['10', '20', '30', '50', '100']}
          // pages={17}
          onPaginationChange={handlePaginationChange}
          placeholder={'100'}
          reversedArrowID={'arrow-ios-forward'}
        /> */}
    </div>
  )
}
