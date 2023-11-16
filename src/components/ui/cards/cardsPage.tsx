import { Link, useParams } from 'react-router-dom'

import { useGetCardsQuery } from '@/api/common.api'

import f from './cardsPage.module.scss'
import { PageName } from './components/pageName/pageName'
import { tableHeadCardsData } from './tableData'
import { ArrowBack } from '@/asserts/icons/components/ArrowBack'
import { EmptyPack } from '@/components/ui/cards/components/emptyPack/emptyPack'
import { Table } from '@/components/ui/table'
import { PageBar } from '@/components/ui/cards/components/pageBar/pageBar'
import { Pagination } from '@/components/ui/pagination'

export const CardsPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetCardsQuery(`${id}`)

  const flag = true

  console.log(data)
  const tableHead = flag
    ? tableHeadCardsData
    : tableHeadCardsData.filter(el => el.headCellName !== '')

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={f.container}>
      <Link className={f.backLink} to={'/'}>
        <ArrowBack />
        Back to Packs List
      </Link>

      {!data?.items?.length ? (
        <EmptyPack packTitle={'Name Pack'} />
      ) : (
        <>
          <PageName isMyDeck={flag} />
          <PageBar />
          <Table
            bodyCell={data?.items || []}
            className={f.container__common}
            headCell={tableHead}
            tableName={'Cards'}
            isMyDeck={flag}
          />
        </>
      )}
      {data?.pagination?.totalPages! > 1 && (
        <Pagination
          arrowColor={'white'}
          arrowID={'arrow-ios-back'}
          options={['10', '20', '30', '50', '100']}
          placeholder={'100'}
          reversedArrowID={'arrow-ios-forward'}
          totalPages={data?.pagination?.totalPages}
        />
      )}
    </div>
  )
}
