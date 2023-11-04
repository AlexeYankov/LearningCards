import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'

type BodyCellComponentType = {
  el: BodyCellType
  onClick?: () => void
  tableName?: string
}

const BodyCell = ({ el, onClick, tableName }: BodyCellComponentType) => {
  return (
    <Cell
      className={s.bodyCell}
      style={tableName === 'Decks' ? { width: '200px' } : { width: '300px' }}
    >
      {/* {el.checkBox && <CheckBox />} */}

      {el.cover && (
        <Typography
          alt={el.bodyCellImageAlt || `${el.cover + ' image'}`}
          as={'img'}
          src={el.cover}
        />
      )}

      {el.name && (
        <Typography onClick={onClick} variant={'body1'}>
          {el.name}
        </Typography>
      )}
      {el.question && (
        <Typography onClick={onClick} variant={'body1'}>
          {el.question}
        </Typography>
      )}
      {el.svgs && (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-end',
            // background: 'red',
            width: '100%',
          }}
        >
          {el.svgs?.map((el, i) => {
            return (
              <div className={s.svgsContainer} key={i}>
                <svg height={'16px'} viewBox={'0 0 24 24'}>
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
            <svg height={'16px'} viewBox={'0 0 24 24'}>
              <use xlinkHref={`${sprite}#${id}`} />
            </svg>
          </div>
        )
      })}
    </Cell>
  )
}

export default BodyCell
