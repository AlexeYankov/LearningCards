import React from 'react'

import s from './table.module.scss'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import BodyCell from './bodyCell/bodyCell'
import HeadCell from './headCell/headCell'
import { BodyCellType, HeadCellType, TableType } from './types'

export const Table = ({ bodyCell, headCell, className, tableName, decks, ...rest }: TableType) => {
  const renderDecks = decks || bodyCell

  return (
    <Root className={`${className ? className : ''}`}>
      <React.Fragment key={'.0'}>
        <Head>
          <Row className={s.row}>
            {headCell?.map((el: HeadCellType, i) => {
              return (
                <HeadCell
                  tableName={tableName === 'NotDecks' && i <= 1 ? 'NotDecks' : 'Decks'}
                  el={el}
                  key={i}
                  {...rest}
                />
              )
            })}
          </Row>
        </Head>
        <Body>
          {renderDecks?.map((el: BodyCellType, i) => {
            const localDate = new Date(el.updated!).toLocaleDateString()

            const starsGrade = Array.from({ length: Math.round(el.grade || 0) }, () => 'star')
            let result = starsGrade
            const emptyStarsGrade = Array.from(
              { length: 5 - Math.round(el.grade || 0) },
              () => 'star-outline'
            )
            if (Math.round(el.grade || 0) - 5 < 0) {
              result = starsGrade.concat(emptyStarsGrade)
            }
            return (
              <Row className={s.row} key={i}>
                {/*pack name*/}
                <BodyCell el={{ name: el.name }} tableName={tableName} />
                {/*cards in pack*/}
                <BodyCell el={{ name: el.cardsCount + '' }} tableName={tableName} />
                {/*//pack update data*/}
                <BodyCell el={{ name: localDate }} tableName="Decks" />
                {/*pack author or stars of card*/}
                {tableName === 'Decks' ? (
                  <BodyCell el={{ name: el.author?.name }} tableName="Decks" />
                ) : (
                  <BodyCell
                    tableName="Decks"
                    el={{
                      stars: result,
                    }}
                  />
                )}
                {/*CRUD icons*/}
                {tableName === 'Decks' && (
                  <BodyCell
                    tableName="Decks"
                    el={{
                      svgs: [
                        { id: 'play-circle-outline' },
                        { id: 'edit-2-outline' },
                        { id: 'trash-outline' },
                      ],
                    }}
                  />
                )}
              </Row>
            )
          })}
        </Body>
      </React.Fragment>
    </Root>
  )
}
