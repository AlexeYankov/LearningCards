import sprite from '@/asserts/sprite.svg'
import { FC } from 'react'

type PropsType = {
  width?: string
  height?: string
  viewBox?: string
  clearSearch?: () => void
  className?: string
  IconStart?: string
  IconEnd?: string
  value?: string
}

export const SearchIcon: FC<PropsType> = ({
  width,
  viewBox,
  className,
  height,
  clearSearch,
  IconEnd,
  value,
  IconStart,
}) => {
  return (
    <div className={className}>
      <svg width={width} height={height} viewBox={viewBox}>
        <use xlinkHref={`${sprite}#${IconStart}`} />
      </svg>
      {!!value && (
        <svg width={width} height={height} viewBox={viewBox} onClick={clearSearch}>
          <use xlinkHref={`${sprite}#${IconEnd}`} />
        </svg>
      )}
    </div>
  )
}
