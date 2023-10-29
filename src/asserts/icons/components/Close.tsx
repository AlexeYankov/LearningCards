import sprite from '@/asserts/sprite.svg'
import { FC } from 'react'

type Props = {
  size?: number
}

export const Close: FC<Props> = ({ size }) => {
  return (
    <svg
      fill={'white'}
      viewBox={'0 0 24 24'}
      xmlns={'http://www.w3.org/2000/svg'}
      width={size}
      height={size}
    >
      <use xlinkHref={`${sprite}#close-outline`} />
    </svg>
  )
}
