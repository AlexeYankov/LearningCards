import React from 'react'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import s from './table.module.scss'
import { BodyCellType, HeadCellType, TableType } from './types'
import { BodyCellHOC } from './bodyCell/bodyCellHOC'
import { HeadCell } from './headCell/headCell'
import { useMeQuery } from '@/api/auth-api/auth.api.ts'

export const Table = ({
  bodyCell,
  className,
  headCell,
  tableName,
  isMyDeck,
  ...rest
}: TableType) => {
  const { data: me } = useMeQuery()

  return (
    <Root className={`${className}`}>
      <React.Fragment key={'.0'}>
        <Head className={s.tableHead}>
          <Row className={`${tableName === 'Cards' ? s.cardsRow : s.decksRow}`}>
            {headCell?.map((el: HeadCellType, i) => {
              return <HeadCell el={el} key={i} {...rest} />
            })}
          </Row>
        </Head>
        <Body>
          {bodyCell?.map((el: BodyCellType, i) => {
            const isMyDeck = el.userId === me?.id

            return <BodyCellHOC item={el} key={i} tableName={tableName || ''} isMyDeck={isMyDeck} />
          })}
        </Body>
      </React.Fragment>
    </Root>
  )
}
