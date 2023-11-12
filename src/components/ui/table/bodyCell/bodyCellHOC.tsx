import { Row } from '@it-incubator/ui-kit'

import s from '../table.module.scss'

import { BodyCellType } from '../types'
import { BodyCell } from './bodyCell'

type BodyCellHOCType = {
  item: BodyCellType
  tableName: string
  isMyDeck?: boolean
}

export const BodyCellHOC = ({ item, tableName, isMyDeck }: BodyCellHOCType) => {
  const starsGrade = Array.from({ length: Math.round(item.grade || 0) }, () => 'star')
  let result = starsGrade
  const emptyStarsGrade = Array.from(
    { length: 5 - Math.round(item.grade || 0) },
    () => 'star-outline'
  )

  if (Math.round(item.grade || 0) - 5 < 0) {
    result = starsGrade.concat(emptyStarsGrade)
  }
  const currentData = new Date(item.updated || 0)
  const currentDay =
    currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate()
  let currentMonth = currentData.getMonth() + 1
  let formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth.toString()

  const convertTimeTo = [currentDay, formattedMonth, currentData.getFullYear()].join('.')

  return (
    <Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>
      {/*pack name*/}
      <BodyCell
        item={item}
        i={(item.name && true) || false}
        tableName={tableName}
        isMyDeck={isMyDeck}
      />
      {/*cards in pack*/}
      <BodyCell item={{ name: item.cardsCount! || item.answer || '0' }} tableName={tableName} />
      {/*//pack update data*/}
      <BodyCell item={{ name: convertTimeTo }} tableName={tableName} />
      {/*pack author or stars of card*/}
      {tableName === 'Decks' ? (
        <BodyCell item={{ name: item.author?.name }} tableName={tableName} />
      ) : (
        <BodyCell
          item={{
            stars: result,
          }}
          tableName={tableName}
          isMyDeck={isMyDeck}
        />
      )}
      {/*CRUD icons for DECKS PAGE*/}
      {tableName === 'Decks' && (
        <BodyCell
          item={{
            id: item.id,
            packName: item.name,
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
          item={{
            svgs: [{ id: '' }, { id: 'edit-2-outline' }, { id: 'trash-outline' }],
          }}
          isMyDeck={isMyDeck}
          tableName={tableName}
        />
      )}
    </Row>
  )
}
