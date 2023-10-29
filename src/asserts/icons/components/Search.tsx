import sprite from '@/asserts/sprite.svg'
import { FC } from 'react'

type Props = {
  size?: number
}

export const Search: FC<Props> = ({ size }) => {
  return (
    <svg
      fill={'none'}
      viewBox={'0 0 24 24'}
      xmlns={'http://www.w3.org/2000/svg'}
      width={size}
      height={size}
    >
      <use xlinkHref={`${sprite}#search-outline`} />
    </svg>
  )
}
