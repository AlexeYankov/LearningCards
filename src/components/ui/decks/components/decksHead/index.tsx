import s from '@/components/ui/decks/decksPage.module.scss'
import { Head, HeadCell, Row } from '@it-incubator/ui-kit'
import { columns } from '@/components/ui/decks/decksData.ts'
import { changeOrderBy } from '@/api/decks/pagination.reducer.ts'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'

export const DecksHead = () => {
  const dispatch = useAppDispatch()

  const sort = useAppSelector(state => state.pagination.sort)

  const handleSort = (key: string) => {
    if (key !== 'actions') {
      dispatch(
        changeOrderBy({
          key,
          direction: sort?.direction === `${key}-asc` ? `${key}-desc` : `${key}-asc`,
        })
      )
    }
    if (sort?.direction === `${key}-desc`) {
      dispatch(
        changeOrderBy({
          key,
          direction: null,
        })
      )
    }
  }

  return (
    <Head className={s.tableHead}>
      <Row className={s.decksRow}>
        {columns.map(({ title, key, sortable }) => {
          return (
            <HeadCell className={s.headCell} key={key} onClick={() => handleSort(key)}>
              {title}
              {sort && sort.key === key && sortable && sort.direction && (
                <button className={s.sortIcon}>
                  {sort.direction === `${key}-desc` ? '▲' : '▼'}
                </button>
              )}
            </HeadCell>
          )
        })}
      </Row>
    </Head>
  )
}
