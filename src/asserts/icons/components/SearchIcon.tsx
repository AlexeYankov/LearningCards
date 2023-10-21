import { FC } from 'react'

import sprite from '@/asserts/sprite.svg'

type PropsType = {
  IconEnd?: string
  IconStart?: string
  className?: string
  clearSearch?: () => void
  height?: string
  value?: string
  viewBox?: string
  width?: string
}

export const SearchIcon: FC<PropsType> = ({
  IconEnd,
  IconStart,
  className,
  clearSearch,
  height,
  value,
  viewBox,
  width,
}) => {
  return (
    <div className={className}>
      <svg height={height} viewBox={viewBox} width={width}>
        <use xlinkHref={`${sprite}#${IconStart}`} />
      </svg>
      {!!value && (
        <svg height={height} onClick={clearSearch} viewBox={viewBox} width={width}>
          <use xlinkHref={`${sprite}#${IconEnd}`} />
        </svg>
      )}
    </div>
  )
}
