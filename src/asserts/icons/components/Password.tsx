import sprite from '@/asserts/sprite.svg'
import { FC } from 'react'

type Props = {
  size?: number
  iconId?: string
}

export const Password: FC<Props> = ({ size, iconId }) => {
  return (
    <svg
      fill={'none'}
      viewBox={'0 0 24 24'}
      xmlns={'http://www.w3.org/2000/svg'}
      width={size}
      height={size}
    >
      <use xlinkHref={`${sprite}#${iconId}`} />
    </svg>
  )
}
