import sprite from '@/asserts/sprite.svg'
import { FC } from 'react'

type PropsType = {
  width?: string
  height?: string
  viewBox?: string
  IconID?: string
  setToggle: () => void
  className: string
}

export const PasswordIcon: FC<PropsType> = ({
  width,
  height,
  viewBox,
  IconID,
  className,
  setToggle,
}) => (
  <div className={className} onClick={setToggle}>
    <svg width={width} height={height} viewBox={viewBox}>
      <use xlinkHref={`${sprite}#${IconID}`} />
    </svg>
  </div>
)
