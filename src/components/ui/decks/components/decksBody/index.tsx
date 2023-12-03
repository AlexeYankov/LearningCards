import s from '@/components/ui/decks/decksPage.module.scss'
import { Body, Cell, Row } from '@it-incubator/ui-kit'
import { Link } from 'react-router-dom'
import { Typography } from '@/components/ui/typography'
import { convertedTime } from '@/helpers/convertedTime'
import { DecksType } from '@/api/decks/decks.api.ts'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { EditDeckModal } from '../editDeckModal'
import { LearnDeckModal } from '../learnDeckModal'
import { DeleteDeckModal } from '../deleteDeckModal'

type DecksBodyProps = {
  decks?: DecksType
}

export const DecksBody = ({ decks }: DecksBodyProps) => {
  const { data: me } = useMeQuery()

  return (
    <Body>
      {decks?.items?.map(deck => {
        const isMyDeck = me?.id === deck.author.id
        return (
          <Row className={s.decksRow} key={deck.id}>
            <Cell className={s.bodyCell}>
              <Link to={deck.id || ''} className={s.deckNameWithImgBox}>
                {deck.cover && (
                  <img className={s.image} src={deck.cover} alt={`${deck.cover + ' image'}`} />
                )}
                {deck.name && (
                  <Typography variant={'body1'} className={s.deckName}>
                    {deck.name}
                  </Typography>
                )}
              </Link>
            </Cell>
            <Cell className={s.bodyCell}>{deck.cardsCount}</Cell>
            <Cell className={s.bodyCell}>{convertedTime(deck.updated)}</Cell>
            <Cell className={s.bodyCell}>{deck.author.name}</Cell>
            <Cell className={`${s.bodyCell}`}>
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
            </Cell>
          </Row>
        )
      })}
    </Body>
  )
}
