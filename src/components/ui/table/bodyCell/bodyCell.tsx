import { Link } from 'react-router-dom'

import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'

type BodyCellComponentType = {
  item: BodyCellType
  i?: boolean
  tableName?: string
  isMyDeck?: boolean
}

export const BodyCell = ({ item, i, tableName }: BodyCellComponentType) => {
  return (
    <Cell className={`${tableName === 'Cards' ? s.cardsCell : s.bodyCell}`}>
      <div className={s.imageWithNameBox}>
        {item.cover && (
          <img
            className={s.image}
            src={item.cover}
            alt={item.bodyCellImageAlt || `${item.cover + ' image'}`}
          />
        )}
        {item.name && (
          <Typography variant={'body1'} className={s.typography}>
            {i ? <Link to={item.id || ''}>{item.name}</Link> : item.name}
          </Typography>
        )}
      </div>
      {item.question && (
        <Typography variant={'body1'} className={s.typography}>
          {item.question}
        </Typography>
      )}

      <div className={s.starsContainer}>
        {item.stars?.map((id, i) => {
          return (
            <div className={s.stars} key={i}>
              <svg height={'16px'} viewBox={'0 0 24 24'}>
                <use xlinkHref={`${sprite}#${id}`} />
              </svg>
            </div>
          )
        })}
      </div>
    </Cell>
  )
}
