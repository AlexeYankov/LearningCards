import { FC } from 'react'

import sprite from '@/asserts/sprite.svg'

type PropsType = {
  IconID?: string
  className: string
  height?: string
  setToggle: () => void
  viewBox?: string
  width?: string
}

export const PasswordIcon: FC<PropsType> = ({
  IconID,
  className,
  height,
  setToggle,
  viewBox,
  width,
}) => (
  <div className={className} onClick={setToggle}>
    <svg height={height} viewBox={viewBox} width={width}>
      <use xlinkHref={`${sprite}#${IconID}`} />
    </svg>
  </div>
)
