import { Link } from 'react-router-dom'

import sprite from '@/asserts/sprite.svg'
import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import { Typography } from '../../typography'
import { BodyCellType } from '../types'
import { useDeleteDeckMutation } from '@/api/decks/decks.api.ts'

type BodyCellComponentType = {
  el: BodyCellType
  i?: boolean
  onClick?: () => void
  tableName?: string
}

const BodyCell = ({ el, i, onClick, tableName }: BodyCellComponentType) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const removeDeckHandler = (deckId: string) => {
    deleteDeck(deckId)
  }

  return (
    <Cell
      className={s.bodyCell}
      style={tableName === 'Decks' ? { width: '200px' } : { width: '300px' }}
    >
      {/*{el.checkBox && <CheckBox checked />}*/}

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
            width: '100%',
          }}
        >
          {el.svgs?.map((svgEl, i) => {
            const crud: any = {
              0: () => alert('is learn'),
              1: () => alert('is edit'),
              2: () => removeDeckHandler(el.id!),
            }

            return (
              <div className={s.svgsContainer} key={i} onClick={crud[i + '']}>
                <svg height={'16px'} viewBox={'0 0 24 24'}>
                  <use xlinkHref={`${sprite}#${svgEl.id}`} />
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
