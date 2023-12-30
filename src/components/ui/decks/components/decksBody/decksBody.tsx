import s from '@/components/ui/decks/decksPage.module.scss'
import {Body, Cell, Row} from '@it-incubator/ui-kit'
import {Link} from 'react-router-dom'
import {Typography} from '@/components/ui/typography'
import {convertedTime} from '@/helpers/convertedTime'
import {useMeQuery} from '@/api/auth'
import {DeleteDeckModal, EditDeckModal, LearnDeckModal} from '@/components/ui/decks'
import {DecksType} from '@/types/decks'
import {SkeletonC} from "@/components/ui/sceleton/skeletonC.tsx";
type Props = {
    decks?: DecksType
    isLoadingD?: boolean

}

export const DecksBody = ({ decks,isLoadingD }: Props) => {
  const { data: me } = useMeQuery()
  return (
    <Body>
      {decks?.items?.map(deck => {
        const isMyDeck = me?.id === deck.author.id
        return (
            <Row className={s.decksRow} key={deck.id}>
                <Cell className={s.bodyCell}>
                    {isLoadingD ? <SkeletonC width={60}/> :
                        <Link to={deck.id || ''} className={s.deckNameWithImgBox}>
                            {deck.cover && (
                                <img className={s.image} src={deck.cover} alt={`${deck.cover + ' image'}`}/>
                            )}

                            {deck.name && (
                                <Typography variant={'body1'} className={s.deckName}>
                                    {deck.name}
                                </Typography>
                            )}
                        </Link>
                    }
                </Cell>
                <Cell className={s.bodyCell}>{isLoadingD ? <SkeletonC width={20}/> : deck.cardsCount < 0 ? 0 : deck.cardsCount}</Cell>
                <Cell className={s.bodyCell}>{isLoadingD ? <SkeletonC width={90}/> : convertedTime(deck.updated)}</Cell>
                <Cell className={s.bodyCell}>{isLoadingD ? <SkeletonC width={40}/> : deck.author.name}</Cell>
                <Cell className={`${s.bodyCell}`}>
                    {isLoadingD ? <SkeletonC width={20}/> :
                        <div className={s.iconsBox}>
                            {isMyDeck ? (
                                <>
                                    <EditDeckModal deck={deck}/>
                                    <LearnDeckModal deck={deck} isMyDeck={isMyDeck}/>
                                    <DeleteDeckModal deck={deck}/>
                                </>
                            ) : (
                                <LearnDeckModal deck={deck} isMyDeck={isMyDeck}/>
                            )}
                        </div>
                    }
                </Cell>
            </Row>
        )
      })}
    </Body>
  )
}
