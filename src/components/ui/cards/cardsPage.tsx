import { useParams } from 'react-router-dom'
import {
  changeCardOrderBy,
  changeCardsCurrentPage,
  changeCardsItemsPerPage,
  selectedOptionSlice,
  useGetCardsQuery,
} from '@/api/cards'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { useGetDecksByIdQuery } from '@/api/decks'
import { useEffect, useState } from 'react'
import { Body, Cell, Head, HeadCell, Root, Row } from '@it-incubator/ui-kit'
import s from './cardsPage.module.scss'
import { EditIcon, StarIcon } from '@/asserts/icons'
import { AddEditCard, DeleteCardModal, PageBar, PageName } from './components'
import { Pagination } from '@/components/ui/pagination'
import { convertedTime } from '@/helpers/convertedTime'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/api/auth'
import { Loader } from '@/components/ui/loader'
import { useDebounce } from '@/hooks/useDebounce'
import { BackLink } from '@/components/ui/backLink'
import { useTranslation } from 'react-i18next'
import { Column, Sort } from '@/types/decks'

export const CardsPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const sort = useAppSelector(state => state.cards.sort)
  const itemsPerPage = useAppSelector(state => state.cards.itemsPerPage)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const { data: cards, isLoading } = useGetCardsQuery({
    id: id!,
    currentPage,
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
        key,
        direction: sort?.direction === `${key}-asc` ? `${key}-desc` : `${key}-asc`,
      })
    )
    if (sort?.direction === `${key}-desc`) {
      dispatch(changeCardOrderBy({ key, direction: null }))
    }
  }

  useEffect(() => {
    dispatch(changeCardsCurrentPage({ currentPage: 1 }))
    dispatch(changeCardsItemsPerPage({ itemsPerPage: 10 }))
    dispatch(selectedOptionSlice({ valueSelect: '' }))
  }, [])

  if (isLoading) {
    return <Loader />
  }

  const columns: Column[] = [
    { key: 'question', sortable: true, title: t('question') },
    { key: 'answer', sortable: true, title: t('answer') },
    { key: 'updated', sortable: true, title: t('last_updated') },
    { key: 'grade', sortable: true, title: t('grade') },
    { key: 'actions', sortable: false, title: '' },
  ]

  return (
    <div className={s.container}>
      <BackLink title={t('back_to_decks_list')} to={''} />
      <PageName
        cardsCount={deckById?.cardsCount!}
        packTitle={deckById?.name}
        isMyCard={isMyCard}
        id={id}
      />
      <div className={s.deckCoverBox}>
        {deckById?.cover && <img className={s.deckCover} src={deckById?.cover} alt="deck cover" />}
      </div>
      <PageBar value={searchValue} onChange={searchCards} />
      {!!cards?.items?.length ? (
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
                <Row key={card.id} className={s.rowBox}>
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
                        <AddEditCard editIcon={<EditIcon />} card={card} />
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
        <Typography as={'p'} variant={'body1'} className={s.emptyPack}>
          No content with these terms...
        </Typography>
      )}
      {cards?.pagination?.totalPages! > 1 && (
        <Pagination
          arrowColor={'white'}
          arrowID={'arrow-ios-back'}
          totalItems={cards?.pagination?.totalItems!}
          reversedArrowID={'arrow-ios-forward'}
          reversed
          totalPages={cards?.pagination?.totalPages!}
          location={'cards'}
        />
      )}
    </div>
  )
}
