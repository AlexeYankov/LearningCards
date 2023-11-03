import React from 'react'

import s from './table.module.scss'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import BodyCell from './bodyCell/bodyCell'
import HeadCell from './headCell/headCell'
import { BodyCellType, HeadCellType, TableType } from './types'

export const Table = ({ bodyCell, headCell, className, tableName, ...rest }: TableType) => {
  return (
    <Root className={`${className ? className : ''}`}>
      <React.Fragment key={'.0'}>
        <Head>
          <Row className={s.row}>
            {headCell?.map((el: HeadCellType, i) => {
              return (
                <HeadCell
                  tableName={tableName === 'Cards' && i <= 1 ? 'Cards' : 'Decks'}
                  el={el}
                  key={i}
                  {...rest}
                />
              )
            })}
          </Row>
        </Head>
        <Body>
          {bodyCell?.map((el: BodyCellType, i) => {
            const starsGrade = Array.from({ length: Math.round(el.grade || 0) }, (v, i) => 'star')
            let result = starsGrade
            const emptyStarsGrade = Array.from(
              { length: 5 - Math.round(el.grade || 0) },
              (v, i) => 'star-outline'
            )
            if (Math.round(el.grade || 0) - 5 < 0) {
              result = starsGrade.concat(emptyStarsGrade)
            }
            const currentData = new Date(el.updated || 0)
            const currentDay =
              currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate()

            const convertTimeTo = [
              currentDay,
              currentData.getMonth(),
              currentData.getFullYear(),
            ].join('.')

            return (
              <Row className={s.row} key={i}>
                {/*pack name*/}
                <BodyCell el={{ name: el.name || el.question }} tableName={tableName} />
                {/*cards in pack*/}
                <BodyCell el={{ name: el.cardsCount || el.answer || '0' }} tableName={tableName} />
                {/*//pack update data*/}
                <BodyCell el={{ name: convertTimeTo }} tableName="Decks" />
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
