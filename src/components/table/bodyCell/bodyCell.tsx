import { CheckBox } from '@/components/checkbox/check-box'
import { Cell as UIBodyCell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import sprite from '../../../asserts/sprite.svg'
import { BodyCellType } from '../types'

type BodyCellComponentType = {
  el: BodyCellType
  padding?: string
  width?: string
}

const BodyCell = ({ el, padding, width }: BodyCellComponentType) => {
  return (
    <UIBodyCell
      className={s.bodyCell}
      style={{ padding: `${el.checkBox ? '0px 24px' : padding}`, width: `${width}` }}
    >
      {el.checkBox && <CheckBox controlledBy />}

      {el.bodyCellImage && (
        <img alt={el.bodyCellImageAlt || `${el.bodyCellName + ' image'}`} src={el.bodyCellImage} />
      )}

      {el.bodyCellName && <span>{el.bodyCellName}</span>}

      {el.svgs?.map(el => {
        return (
          <div
            key={el.uniqId}
            style={{ display: 'flex', margin: '0px', padding: '0px', width: `${el.width}` }}
          >
            <svg height={el.height} viewBox={el.viewBox || '0 0 24 24'} width={el.width || '16px'}>
              <use xlinkHref={`${sprite}#${el.id}`} />
            </svg>
          </div>
        )
      })}

      {el.stars?.map((currentEl, i) => {
        return (
          <div
            className={s.stars}
            key={i}
            style={{ display: 'flex', margin: '0px', padding: '0px' }}
          >
            <svg height={'16px'} viewBox={'0 0 24 24'} width={el.width}>
              <use xlinkHref={`${sprite}#${currentEl}`} />
            </svg>
          </div>
        )
      })}
    </UIBodyCell>
  )
}

export default BodyCell
