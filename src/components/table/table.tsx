import { Body, Head, Root, Row } from '@it-incubator/ui-kit'
import React from 'react'

// import sprite from '../../asserts/sprite.svg'

import s from './table.module.scss'

import HeadCell from './headCell/headCell'
import BodyCell from './bodyCell/bodyCell'
import { BodyCellType, HeadCellType, TableType } from './types'

export const Table = ({ headCell, bodyCell, ...rest }: TableType) => {
  return (
    <Root>
      <React.Fragment key=".0">
        <Head>
          <Row>
            {headCell?.map((el: HeadCellType) => {
              return <HeadCell el={el} key={el.id} {...rest} />
            })}
          </Row>
        </Head>
        <Body>
          {bodyCell?.map((el: BodyCellType) => {
            return (
              <Row>
                <BodyCell key={el.id} el={el} {...rest} />
              </Row>
            )
          })}
        </Body>
      </React.Fragment>
    </Root>
  )
}
