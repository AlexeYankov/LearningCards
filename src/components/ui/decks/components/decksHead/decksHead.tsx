import s from '@/components/ui/decks/decksPage.module.scss'
import { Head, HeadCell, Row } from '@it-incubator/ui-kit'
import { changeOrderBy } from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { useTranslation } from 'react-i18next'

import { Column } from '@/types/decks'

export const DecksHead = () => {
  const dispatch = useAppDispatch()

  const sort = useAppSelector(state => state.decks.sort)

  const { t } = useTranslation()

  const columns: Column[] = [
    {
      key: 'name',
      title: t('name'),
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: t('cards'),
      sortable: true,
    },
    {
      key: 'updated',
      title: t('last_updated'),
      sortable: true,
    },
    {
      key: 'author.name',
      title: t('created_by'),
      sortable: true,
    },
    {
      key: 'actions',
      title: '',
      sortable: false,
    },
  ]

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
