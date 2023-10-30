import React from 'react'

import { Body, Head, Root, Row } from '@it-incubator/ui-kit'

import BodyCell from './bodyCell/bodyCell'
import HeadCell from './headCell/headCell'
import { BodyCellType, HeadCellType, TableType } from './types'

export const Table = ({ bodyCell, headCell, ...rest }: TableType) => {
  return (
    <Root>
      <React.Fragment key={'.0'}>
        <Head>
          <Row>
            {headCell?.map((el: HeadCellType, i) => {
              return <HeadCell el={el} key={i} {...rest} />
            })}
          </Row>
        </Head>
        <Body>
          <Row>
            {bodyCell?.map((el: BodyCellType, i) => {
              return <BodyCell el={el} key={i} {...rest} />
            })}
          </Row>
        </Body>
      </React.Fragment>
    </Root>
  )
}
