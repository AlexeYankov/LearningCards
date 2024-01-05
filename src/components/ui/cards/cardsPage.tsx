import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useMeQuery } from '@/api/auth'
import {
  changeCardOrderBy,
  changeCardsCurrentPage,
  changeCardsItemsPerPage,
  selectedOptionSlice,
  useGetCardsQuery,
} from '@/api/cards'
import { useGetDecksByIdQuery } from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { EditIcon, StarIcon } from '@/asserts/icons'
import { BackLink } from '@/components/ui/backLink'
import { Pagination } from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { convertedTime } from '@/helpers/convertedTime'
import { useDebounce } from '@/hooks/useDebounce'
import { Column, Sort } from '@/types/decks'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'

import s from './cardsPage.module.scss'

import { AddEditCard, DeleteCardModal, PageBar, PageName } from './components'

export const CardsPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const currentPage = useAppSelector(state => state.cards.currentPage)
  const sort = useAppSelector(state => state.cards.sort)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)

  const { data: cards } = useGetCardsQuery({
    currentPage,
    id: id!,
    itemsPerPage,
    orderBy: sort?.direction as Sort,
    question: debouncedSearchValue,
  })
  const { data: me } = useMeQuery()
  const { data: deckById } = useGetDecksByIdQuery(id!)

  const isMyCard = deckById?.userId === me?.id

  const searchCards = (value: string) => {
    dispatch(changeCardsCurrentPage({ currentPage: 1 }))
    dispatch(changeCardsItemsPerPage({ itemsPerPage: 10 }))
    setSearchValue(value)
  }
  const handleSort = (key: string) => {
    dispatch(
      changeCardOrderBy({
        direction: sort?.direction === `${key}-asc` ? `${key}-desc` : `${key}-asc`,
        key,
      })
    )
    if (sort?.direction === `${key}-desc`) {
      dispatch(changeCardOrderBy({ direction: null, key }))
    }
  }

  useEffect(() => {
    dispatch(changeCardsCurrentPage({ currentPage: 1 }))
    dispatch(changeCardsItemsPerPage({ itemsPerPage: 10 }))
    dispatch(selectedOptionSlice({ valueSelect: '' }))
  }, [])

  const columns: Column[] = [
    { key: 'question', sortable: true, title: t('question') },
    { key: 'answer', sortable: true, title: t('answer') },
    { key: 'updated', sortable: true, title: t('last_updated') },
    { key: 'grade', sortable: true, title: t('grade') },
    { key: 'actions', sortable: false, title: '' },
  ]

  return (
    <>
      <div className={s.container}>
        <BackLink title={t('back_to_decks_list')} to={''} />
        <PageName
          cardsCount={deckById?.cardsCount!}
          id={id}
          isMyCard={isMyCard}
          packTitle={deckById?.name}
        />
        <div className={s.deckCoverBox}>
          {deckById?.cover && (
            <img alt={'deck cover'} className={s.deckCover} src={deckById?.cover} />
          )}
        </div>
        <PageBar onChange={searchCards} value={searchValue} />
        {cards?.items?.length ? (
          <Root className={s.container__common}>
            <Head>
              <Row className={s.cardsRow}>
                {columns.map(({ key, sortable, title }) => {
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
                  <Row className={s.rowBox} key={card.id}>
                    <Cell className={s.bodyCell}>
                      <div className={s.imageWithNameBox}>
                        {card.question && card.questionImg && (
                          <img
                            alt={`${card.questionImg + ' image'}`}
                            className={s.image}
                            src={card.questionImg}
                          />
                        )}
                        <Typography className={s.typography} variant={'body1'}>
                          {card.question}
                        </Typography>
                      </div>
                    </Cell>
                    <Cell className={s.bodyCell}>
                      <div className={s.imageWithNameBox}>
                        {card.answer && card.answerImg && (
                          <img
                            alt={`${card.answerImg + ' image'}`}
                            className={s.image}
                            src={card.answerImg}
                          />
                        )}
                        <Typography className={s.typography} variant={'body1'}>
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
                          <AddEditCard card={card} editIcon={<EditIcon />} />
                          <DeleteCardModal card={card} />
                        </div>
                      </Cell>
                    )}
                  </Row>
                )
              })}
            </Body>
          </Root>
        ) : (
          <Typography as={'p'} className={s.emptyPack} variant={'body1'}>
            No content with these terms...
          </Typography>
        )}
        {cards?.pagination?.totalPages! > 1 && (
          <Pagination
            arrowColor={'white'}
            arrowID={'arrow-ios-back'}
            location={'cards'}
            reversed
            reversedArrowID={'arrow-ios-forward'}
            totalItems={cards?.pagination?.totalItems!}
            totalPages={cards?.pagination?.totalPages!}
          />
        )}
      </div>
    </>
  )
}
