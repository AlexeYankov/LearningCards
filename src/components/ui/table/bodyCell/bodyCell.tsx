import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import sprite from '@/asserts/sprite.svg'
import { BodyCellType } from '../types'
import { Typography } from '../../typography'

type BodyCellComponentType = {
  el: BodyCellType
  tableName?: string
}

const BodyCell = ({ el, tableName }: BodyCellComponentType) => {
  return (
    <Cell
      className={s.bodyCell}
      style={tableName === 'Decks' ? { width: '200px' } : { width: '300px' }}
    >
      {/*{el.checkBox && <CheckBox checked />}*/}

      {el.cover && (
        <Typography as="img" alt={el.bodyCellImageAlt || `${el.cover + ' image'}`} src={el.cover} />
      )}

      {el.name && <Typography variant="body1">{el.name}</Typography>}
      {el.svgs && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            // background: 'red',
            width: '100%',
          }}
        >
          {el.svgs?.map((el, i) => {
            return (
              <div className={s.svgsContainer} key={i}>
                <svg height="16px" viewBox="0 0 24 24">
                  <use xlinkHref={`${sprite}#${el.id}`} />
                </svg>
              </div>
            )
          })}
        </div>
      )}

      {el.stars?.map((id, i) => {
        return (
          <div className={s.stars} key={i}>
            <svg height="16px" viewBox="0 0 24 24">
              <use xlinkHref={`${sprite}#${id}`} />
            </svg>
          </div>
        )
      })}
    </Cell>
  )
}

export default BodyCell
