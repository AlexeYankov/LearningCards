import { Link, useParams } from 'react-router-dom'
import { useGetCardsQuery } from '@/api/common.api'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { resetFilter } from '@/api/decks/decks.reducer.ts'
import { useEffect } from 'react'
import {
  changeCardOrderBy,
  changeCardsCurrentPage,
  changeCardsItemsPerPage,
} from '@/api/cards/cards.ts'
import { Column, Sort } from '@/components/ui/table/types.ts'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'
import s from './cardsPage.module.scss'
import { EditIcon } from '@/asserts/icons/components/EditIcon.tsx'
import { EmptyPack } from '@/components/ui/cards/components/emptyPack/emptyPack.tsx'
import { PageName } from '@/components/ui/cards/components/pageName/pageName.tsx'
import { PageBar } from '@/components/ui/cards/components/pageBar/pageBar.tsx'
import { ArrowBackIcon } from '@/asserts/icons/components/ArrowBackIcon.tsx'
import { Pagination } from '@/components/ui/pagination'
import { StarIcon } from '@/asserts/icons/components/StarIcon.tsx'
import { convertedTime } from '@/helpers/convertedTime.ts'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/api/auth-api/auth.api.ts'
import { DeleteIcon } from '@/asserts/icons/components/DeleteIcon.tsx'
import { Loader } from '@/components/ui/loader/loader.tsx'

export const CardsPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const sort = useAppSelector(state => state.cards.sort)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
  const { data: cards, isLoading } = useGetCardsQuery({
    id: id!,
    currentPage,
    itemsPerPage,
    orderBy: sort?.direction as Sort,
  })

  const { data: me } = useMeQuery()

  const resetFilterDecks = () => {
    dispatch(changeCardsCurrentPage({ currentPage: 1 }))
    dispatch(changeCardsItemsPerPage({ itemsPerPage: 10 }))
    localStorage.setItem('page', '1')
    dispatch(resetFilter())
  }

  const handleSort = (key: string) => {
    dispatch(
      changeCardOrderBy({
        key,
        direction: sort?.direction === `${key}-asc` ? `${key}-desc` : `${key}-asc`,
      })
    )
    if (sort?.direction === `${key}-desc`) {
      dispatch(
        changeCardOrderBy({
          key,
          direction: null,
        })
      )
    }
  }

  useEffect(() => {
    resetFilterDecks()
  }, [])

  if (isLoading) {
    return <Loader />
  }
  let isMyCard: boolean = false

  if (cards) {
    // @ts-ignore
    isMyCard = cards.items[0]?.userId === me?.id
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
        <ArrowBackIcon />
        Back to Packs List
      </Link>

      {!cards?.items?.length ? (
        <EmptyPack packTitle={'Name Pack'} />
      ) : (
        <>
          <PageName isMyCard={isMyCard} id={id} />
          <PageBar />
          <Root className={s.container__common}>
            <Head>
              <Row className={s.cardsRow}>
                {columns.map(({ title, key, sortable }) => {
                  if (!isMyCard && key === 'actions') {
                    return null
                  }
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
            <Body>
              {cards?.items?.map(card => {
                const starsGrade = Array.from({ length: Math.round(card.grade || 0) }, () => 'star')
                let result = starsGrade
                const emptyStarsGrade = Array.from(
                  { length: 5 - Math.round(card.grade || 0) },
                  () => 'star-outline'
                )

                if (Math.round(card.grade || 0) - 5 < 0) {
                  result = starsGrade.concat(emptyStarsGrade)
                }

                return (
                  <Row key={card.id}>
                    <Cell className={s.bodyCell}>
                      <div className={s.imageWithNameBox}>
                        {card.question && card.questionImg && (
                          <img
                            className={s.image}
                            src={card.questionImg}
                            alt={`${card.questionImg + ' image'}`}
                          />
                        )}
                        <Typography variant={'body1'} className={s.typography}>
                          {card.question}
                        </Typography>
                      </div>
                    </Cell>
                    <Cell className={s.bodyCell}>
                      <div className={s.imageWithNameBox}>
                        {card.answer && card.answerImg && (
                          <img
                            className={s.image}
                            src={card.answerImg}
                            alt={`${card.answerImg + ' image'}`}
                          />
                        )}
                        <Typography variant={'body1'} className={s.typography}>
                          {card.answer}
                        </Typography>
                      </div>
                    </Cell>
                    <Cell className={s.bodyCell}>{convertedTime(card.updated)}</Cell>
                    <Cell className={`${s.bodyCell} `}>
                      <div className={s.starsBox}>
                        {result.map((star, i) => {
                          return <StarIcon iconId={star} key={i} />
                        })}
                      </div>
                    </Cell>
                    {isMyCard && (
                      <Cell className={`${s.bodyCell} `}>
                        <div className={s.iconBox}>
                          <EditIcon />
                          <DeleteIcon />
                        </div>
                      </Cell>
                    )}
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
