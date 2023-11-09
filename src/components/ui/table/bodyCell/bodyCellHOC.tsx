import { Row } from '@it-incubator/ui-kit'

import s from '../table.module.scss'

import { BodyCellType } from '../types'
import BodyCell from './bodyCell'

type BodyCellHOCType = {
  el: BodyCellType
  tableName: string
}

export const BodyCellHOC = ({ el, tableName }: BodyCellHOCType) => {
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

  const convertTimeTo = [currentDay, currentData.getMonth(), currentData.getFullYear()].join('.')

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
        />
      )}
      {/*CRUD icons*/}
      {tableName === 'Decks' && (
        <BodyCell
          el={{
            svgs: [
              { id: 'play-circle-outline' },
              { id: 'edit-2-outline' },
              { id: 'trash-outline' },
            ],
            id: el.id,
            author: { id: el.author?.id },
          }}
          tableName={'Decks'}
        />
      )}
    </Row>
  )
}
