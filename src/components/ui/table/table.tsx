import React from 'react'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import s from './table.module.scss'
import { BodyCellType, HeadCellType, TableType } from './types'
import HeadCell from '@/components/ui/table/headCell/headCell.tsx'
import { BodyCellHOC } from '@/components/ui/table/bodyCell/bodyCellHOC'

export const Table = ({
  bodyCell,
  className,
  headCell,
  tableName,
  isMyDeck,
  ...rest
}: TableType) => {
  return (
    <Root className={`${className}`}>
      <React.Fragment key={'.0'}>
        <Head>
          <Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>
            {headCell?.map((el: HeadCellType, i) => {
              return <HeadCell el={el} key={i} tableName={tableName} {...rest} />
            })}
          </Row>
        </Head>
        <Body>
          {bodyCell?.map((el: BodyCellType, i) => {
            return <BodyCellHOC el={el} key={i} tableName={tableName || ''} isMyDeck={isMyDeck} />
          })}
        </Body>
      </React.Fragment>
    </Root>
  )
}
