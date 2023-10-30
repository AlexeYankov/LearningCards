import { Cell } from '@it-incubator/ui-kit'

import s from './bodyCell.module.scss'

import sprite from '@/asserts/sprite.svg'
import { BodyCellType } from '../types'
import { CheckBox } from '../../checkbox'
import { Typography } from '../../typography'

type BodyCellComponentType = {
  el: BodyCellType
}

const BodyCell = ({ el, }: BodyCellComponentType) => {
  return (
    <Cell
      className={s.bodyCell}
      // style={{ padding: `${el.checkBox ? '0px 24px' : padding}`, width: `${width}` }}
    >
      {el.checkBox && <CheckBox />}

      {el.bodyCellImage && (
        <Typography
          as="img"
          alt={el.bodyCellImageAlt || `${el.bodyCellName + ' image'}`}
          src={el.bodyCellImage}
        />
      )}

      {el.bodyCellName && (
        <Typography as="span" variant="body1">
          {el.bodyCellName}
        </Typography>
      )}

      {el.svgs?.map((el, i) => {
        return (
          <div className={s.svgsContainer} key={i}>
            <svg height="16px" viewBox="0 0 24 24">
              <use xlinkHref={`${sprite}#${el.id}`} />
            </svg>
          </div>
        )
      })}

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
