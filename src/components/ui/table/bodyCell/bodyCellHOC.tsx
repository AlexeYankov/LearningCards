import { useGetCardsQuery } from '@/api/common.api'
import { Row } from '@it-incubator/ui-kit'

import s from '../table.module.scss'

import { BodyCellType } from '../types'
import BodyCell from './bodyCell'

type BodyCellHOCType = {
  el: BodyCellType
  tableName: string
  isMyDeck: boolean
}

export const BodyCellHOC = ({ el, tableName, isMyDeck }: BodyCellHOCType) => {
  const starsGrade = Array.from({ length: Math.round(el.grade || 0) }, () => 'star')
  let result = starsGrade
  const emptyStarsGrade = Array.from(
    { length: 5 - Math.round(el.grade || 0) },
    () => 'star-outline'
  )

  if (Math.round(el.grade || 0) - 5 < 0) {
    result = starsGrade.concat(emptyStarsGrade)
  }
  const currentData = new Date(el.updated || 0)
  const currentDay =
    currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate()
  const currentMonth =
    currentData.getMonth() < 10 ? '0' + currentData.getMonth() : currentData.getMonth()

  const convertTimeTo = [currentDay, currentMonth, currentData.getFullYear()].join('.')

  return (
    <Row className={s.row}>
      {/*pack name*/}
      <BodyCell
        el={{ id: el.id, name: el.name || el.question }}
        i={(el.name && true) || false}
        tableName={tableName}
      />
      {/*cards in pack*/}
      <BodyCell el={{ name: el.cardsCount || el.answer || '0' }} tableName={tableName} />
      {/*//pack update data*/}
      <BodyCell el={{ name: convertTimeTo }} tableName={'Decks'} />
      {/*pack author or stars of card*/}
      {tableName === 'Decks' ? (
        <BodyCell el={{ name: el.author?.name }} tableName={'Decks'} />
      ) : (
        <BodyCell
          el={{
            stars: result,
          }}
          tableName={'Decks'}
          isMyDeck={isMyDeck}
        />
      )}
      {/*CRUD icons for DECKS PAGE*/}
      {tableName === 'Decks' && (
        <BodyCell
          el={{
            svgs: [
              { id: 'play-circle-outline' },
              /*tableName vs decks will change if is your deck or not!*/
              { id: tableName === 'Decks' ? 'edit-2-outline' : '' },
              { id: tableName === 'Decks' ? 'trash-outline' : '' },
            ],
          }}
          tableName={'Decks'}
        />
      )}
      {/*true will change is your deck or not! is this ONLY FOR CARDS PAGE*/}
      {tableName === 'Cards' && isMyDeck && (
        <BodyCell
          el={{
            svgs: [{ id: '' }, { id: 'edit-2-outline' }, { id: 'trash-outline' }],
          }}
          isMyDeck={isMyDeck}
          tableName={'Decks'}
        />
      )}
    </Row>
  )
}
