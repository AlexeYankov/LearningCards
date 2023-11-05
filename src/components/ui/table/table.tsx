import React from 'react'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import s from './table.module.scss'

import { BodyCellHOC } from './bodyCell/bodyCellHOC'
import HeadCell from './headCell/headCell'
import { BodyCellType, HeadCellType, TableType } from './types'

export const Table = ({ bodyCell, className, headCell, tableName, ...rest }: TableType) => {
  return (
    <Root className={`${className ? className : ''}`}>
      <React.Fragment key={'.0'}>
        <Head>
          <Row className={s.row}>
            {headCell?.map((el: HeadCellType, i) => {
              return (
                <HeadCell
                  el={el}
                  key={i}
                  tableName={tableName === 'Cards' && i <= 1 ? 'Cards' : 'Decks'}
                  {...rest}
                />
              )
            })}
          </Row>
        </Head>
        <Body>
          {bodyCell?.map((el: BodyCellType, i) => {
            return <BodyCellHOC el={el} key={i} tableName={tableName || ''}/>
          })}
        </Body>
      </React.Fragment>
    </Root>
  )
}
