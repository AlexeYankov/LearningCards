import React from 'react'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import s from './table.module.scss'

import { BodyCellHOC } from './bodyCell/bodyCellHOC'
import HeadCell from './headCell/headCell'
import { BodyCellType, HeadCellType, TableType } from './types'

export const Table = ({ bodyCell, className, decks, headCell, isMyDeck, tableName, ...rest }: TableType) => {
  const renderDecks = decks || bodyCell

  return (
    <Root className={`${className}`}>
      <React.Fragment key={'.0'}>
        <Head>
          <Row className={s.row}>
            {headCell?.map((el: HeadCellType, i) => {
              return (
                <HeadCell
                  el={el}
                  key={i}
                  isMyDeck={isMyDeck}
                  tableName={tableName === 'Cards' && i <= 1 ? 'Cards' : 'Decks'}
                  {...rest}
                />
              )
            })}
          </Row>
        </Head>
        <Body>
          {renderDecks?.map((el: BodyCellType, i) => {
            return <BodyCellHOC el={el} key={i} tableName={tableName || ''} isMyDeck={isMyDeck || false} />
          })}
        </Body>
      </React.Fragment>
    </Root>
  )
}
