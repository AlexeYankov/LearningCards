import { Row } from '@it-incubator/ui-kit'

import s from '../table.module.scss'

import { BodyCellType } from '../types'
import BodyCell from './bodyCell'

type BodyCellHOCType = {
  el: BodyCellType
  tableName: string
  isMyDeck?: boolean
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
  let currentMonth = currentData.getMonth() + 1
  let formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth.toString()

  const convertTimeTo = [currentDay, formattedMonth, currentData.getFullYear()].join('.')

  return (
    <Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>
      {/*pack name*/}
      <BodyCell
        el={{ id: el.id, name: el.name || el.question }}
        i={(el.name && true) || false}
        tableName={tableName}
        isMyDeck={isMyDeck}
      />
      {/*cards in pack*/}
      <BodyCell el={{ name: el.cardsCount || el.answer || '0' }} tableName={tableName} />
      {/*//pack update data*/}
      <BodyCell el={{ name: convertTimeTo }} tableName={tableName} />
      {/*pack author or stars of card*/}
      {tableName === 'Decks' ? (
        <BodyCell el={{ name: el.author?.name }} tableName={tableName} />
      ) : (
        <BodyCell
          el={{
            stars: result,
          }}
          tableName={tableName}
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
          tableName={tableName}
          isMyDeck={isMyDeck}
        />
      )}
      {/*true will change is your deck or not! is this ONLY FOR CARDS PAGE*/}
      {tableName === 'Cards' && isMyDeck && (
        <BodyCell
          el={{
            svgs: [{ id: '' }, { id: 'edit-2-outline' }, { id: 'trash-outline' }],
          }}
          isMyDeck={isMyDeck}
          tableName={tableName}
        />
      )}
    </Row>
  )
}
