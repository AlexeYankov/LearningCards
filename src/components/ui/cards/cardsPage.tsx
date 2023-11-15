import { Link, useParams } from 'react-router-dom'

import { useGetCardsQuery } from '@/api/common.api'

import f from './cardsPage.module.scss'
import { Table } from '../table'
import { PageBar } from './components/pageBar/pageBar'
import { PageName } from './components/pageName/pageName'
import { tableHeadCardsData } from './tableData'
import { ArrowBack } from '@/asserts/icons/components/ArrowBack'

export const CardsPage = () => {
  const { id } = useParams()
  const { data } = useGetCardsQuery(`${id}`)

  const flag = true
  return (
    <div className={f.container}>
      <Link className={f.backLink} to={'/'}>
        <ArrowBack />
        Back to Packs List
      </Link>
      <PageName isMyDeck={flag} />
      <PageBar />
      <Table
        bodyCell={data?.items || []}
        className={f.container__common}
        headCell={
          flag ? tableHeadCardsData : tableHeadCardsData.filter(el => el.headCellName != '')
        }
        tableName={'Cards'}
        isMyDeck={flag}
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
