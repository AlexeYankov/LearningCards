import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'
import { Link } from 'react-router-dom'

type BodyCellComponentType = {
  el: BodyCellType
  onClick?: () => void
  tableName?: string
  i?: boolean
}

const BodyCell = ({ el, onClick, tableName, i }: BodyCellComponentType) => {
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
          {i ? <Link to={el.id || ''}>{el.name}</Link> : el.name}
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
            const crud: any = {
              0: () => alert('is learn'),
              1: () => alert('is edit'),
              2: () => alert('is delete'),
            }
            return (
              <div className={s.svgsContainer} key={i} onClick={crud[i + '']}>
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
