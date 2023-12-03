import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import s from './table.module.scss'
import { BodyCellType, TableType } from './types'
import { BodyCellHOC } from './bodyCell/bodyCellHOC'
import { HeadCell } from './headCell/headCell'
import { useMeQuery } from '@/api/auth-api/auth.api.ts'
import { ArrowUp } from '@/asserts/icons/components/ArrowUp.tsx'

export const Table = ({
  bodyCell,
  className,
  headCell,
  tableName, // ...rest
}: TableType) => {
  const { sort, onSort, columns } = headCell!

  const { data: me } = useMeQuery()

  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    // dispatch(changeOrderBy({ orderBy: sort?.direction === 'asc' ? 'desc' : 'asc' }))

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <Root className={`${className}`}>
      <Head className={s.tableHead}>
        <Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>
          {columns.map(({ title, key, sortable }) => {
            return (
              <HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>
                {title}
                {sort?.key === key ? <ArrowUp /> : ''}
              </HeadCell>
            )
          })}
        </Row>
      </Head>
      <Body>
        {bodyCell?.map((item: BodyCellType, i) => {
          const isMyDeck = item.userId === me?.id
          return <BodyCellHOC item={item} key={i} tableName={tableName || ''} isMyDeck={isMyDeck} />
        })}
      </Body>
    </Root>
  )
}
