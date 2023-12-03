import { FC } from 'react'

import sprite from '@/asserts/sprite.svg'

type Props = {
  size?: number
}

export const CloseIcon: FC<Props> = ({ size }) => {
  return (
    <svg
      fill={'white'}
      height={size}
      viewBox={'0 0 24 24'}
      width={size}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${sprite}#close-outline`} />
    </svg>
  )
}
