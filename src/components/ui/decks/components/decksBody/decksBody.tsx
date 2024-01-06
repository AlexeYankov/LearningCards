import { Link } from 'react-router-dom'

import { useMeQuery } from '@/api/auth'
import { DeleteDeckModal, EditDeckModal, LearnDeckModal } from '@/components/ui/decks'
import { SkeletonC } from '@/components/ui/sceleton/skeletonC.tsx'
import { Typography } from '@/components/ui/typography'
import { convertedTime } from '@/helpers/convertedTime'
import { DecksType } from '@/types/decks'
import { Body, Cell, Row } from '@it-incubator/ui-kit'

import s from '@/components/ui/decks/decksPage.module.scss'

type Props = {
  decks?: DecksType
  isFetching?: boolean
}

export const DecksBody = ({ decks, isFetching }: Props) => {
  const { data: me } = useMeQuery()

  return (
    <Body>
      {decks?.items?.map(deck => {
        const isMyDeck = me?.id === deck.author.id

        return (
          <Row className={s.decksRow} key={deck.id}>
            <Cell className={`${s.bodyCell} ${deck.isPrivate && s.isPrivate}`}>
              {isFetching ? (
                <SkeletonC width={60} />
              ) : (
                <Link className={s.deckNameWithImgBox} to={deck.id || ''}>
                  {deck.cover && (
                    <img alt={`${deck.cover + ' image'}`} className={s.image} src={deck.cover} />
                  )}

                  {deck.name && (
                    <Typography className={s.deckName} variant={'body1'}>
                      {deck.name}
                    </Typography>
                  )}
                </Link>
              )}
            </Cell>
            <Cell className={s.bodyCell}>
              {isFetching ? <SkeletonC width={20} /> : deck.cardsCount < 0 ? 0 : deck.cardsCount}
            </Cell>
            <Cell className={s.bodyCell}>
              {isFetching ? <SkeletonC width={90} /> : convertedTime(deck.updated)}
            </Cell>
            <Cell className={s.bodyCell}>
              {isFetching ? <SkeletonC width={40} /> : deck.author.name}
            </Cell>
            <Cell className={`${s.bodyCell}`}>
              {isFetching ? (
                <SkeletonC width={20} />
              ) : (
                <div className={s.iconsBox}>
                  {isMyDeck ? (
                    <>
                      <EditDeckModal deck={deck} />
                      <LearnDeckModal deck={deck} isMyDeck={isMyDeck} />
                      <DeleteDeckModal deck={deck} />
                    </>
                  ) : (
                    <LearnDeckModal deck={deck} isMyDeck={isMyDeck} />
                  )}
                </div>
              )}
            </Cell>
          </Row>
        )
      })}
    </Body>
  )
}
