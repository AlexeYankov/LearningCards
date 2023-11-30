import { Link, useParams } from 'react-router-dom'
import { useGetCardsQuery } from '@/api/common.api'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { changeCurrentPage, changeItemsPerPage } from '@/api/decks/pagination.reducer'
import { useEffect } from 'react'
import { changeCardsCurrentPage, changeCardsItemsPerPage } from '@/api/cards/cards.ts'
import { Column } from '@/components/ui/table/types.ts'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'
import s from './cardsPage.module.scss'
import { Edit } from '@/asserts/icons/components/Edit.tsx'
import { EmptyPack } from '@/components/ui/cards/components/emptyPack/emptyPack.tsx'
import { PageName } from '@/components/ui/cards/components/pageName/pageName.tsx'
import { PageBar } from '@/components/ui/cards/components/pageBar/pageBar.tsx'
import { ArrowBack } from '@/asserts/icons/components/ArrowBack.tsx'
import { Pagination } from '@/components/ui/pagination'
import { Star } from '@/asserts/icons/components/Star.tsx'

export const CardsPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.pagination.currentPage)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
  const { data: cards, isLoading } = useGetCardsQuery({
    id: id!,
    currentPage,
    itemsPerPage,
  })

  const resetFilterDecks = () => {
    dispatch(changeCardsCurrentPage({ currentPage: 1 }))
    dispatch(changeCurrentPage({ currentPage: 1 }))
    dispatch(changeItemsPerPage({ itemsPerPage: 10 }))
    dispatch(changeCardsItemsPerPage({ itemsPerPage: 10 }))
  }

  useEffect(() => {
    resetFilterDecks()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const columns: Column[] = [
    { key: 'question', sortable: true, title: 'Question' },
    { key: 'answer', sortable: true, title: 'Answer' },
    { key: 'updated', sortable: true, title: 'Last updated' },
    { key: 'grade', sortable: true, title: 'Grade' },
    { key: 'actions', sortable: false, title: '' },
  ]

  return (
    <div className={s.container}>
      <Link className={s.backLink} to={'/'} onClick={resetFilterDecks}>
        <ArrowBack />
        Back to Packs List
      </Link>

      {!cards?.items?.length ? (
        <EmptyPack packTitle={'Name Pack'} />
      ) : (
        <>
          <PageName isMyDeck={true} />
          <PageBar />
          <Root className={s.container__common}>
            <Head className={s.tableHead}>
              {/*<Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>*/}
              <Row className={s.cardsRow}>
                {columns.map(({ title, key }) => {
                  return (
                    <HeadCell className={s.headCell} key={key}>
                      {/*<HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>*/}
                      {title}
                      {/*{sort?.key === key ? <ArrowUp /> : ''}*/}
                    </HeadCell>
                  )
                })}
              </Row>
            </Head>
            <Body>
              {cards?.items?.map(card => {
                const currentData = new Date(card.updated || 0)
                const currentDay =
                  currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate()
                let currentMonth = currentData.getMonth() + 1
                let formattedMonth =
                  currentMonth < 10 ? '0' + currentMonth : currentMonth.toString()

                const convertTimeTo = [currentDay, formattedMonth, currentData.getFullYear()].join(
                  '.'
                )

                const starsGrade = Array.from(
                  { length: Math.round(card.rating || 0) },
                  () => 'star'
                )
                let result = starsGrade
                const emptyStarsGrade = Array.from(
                  { length: 5 - Math.round(card.rating || 0) },
                  () => 'star-outline'
                )

                if (Math.round(card.rating || 0) - 5 < 0) {
                  result = starsGrade.concat(emptyStarsGrade)
                }
                return (
                  <Row key={card.id}>
                    <Cell className={s.bodyCell}>{card.question}</Cell>
                    <Cell className={s.bodyCell}>{card.answer}</Cell>
                    <Cell className={s.bodyCell}>{convertTimeTo}</Cell>
                    <Cell className={`${s.bodyCell} ${s.starsBox}`}>
                      {result.map((star, i) => {
                        console.log(star)
                        return <Star iconId={star} key={i} />
                      })}
                    </Cell>
                    <Cell className={`${s.bodyCell} ${s.iconBox}`}>
                      <Edit />
                    </Cell>
                  </Row>
                )
              })}
            </Body>
          </Root>
        </>
      )}
      {cards?.pagination?.totalPages! > 1 && (
        <Pagination
          arrowColor={'white'}
          arrowID={'arrow-ios-back'}
          totalItems={cards?.pagination?.totalItems}
          reversedArrowID={'arrow-ios-forward'}
          reversed
          totalPages={cards?.pagination?.totalPages}
        />
      )}
    </div>
  )
}
