import { FC } from 'react'

import sprite from '@/asserts/sprite.svg'

type Props = {
  size?: number
}

export const Search: FC<Props> = ({ size }) => {
  return (
    <svg
      fill={'none'}
      height={size}
      viewBox={'0 0 24 24'}
      width={size}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${sprite}#search-outline`} />
    </svg>
  )
}
