import { FC } from 'react'

import sprite from '@/asserts/sprite.svg'

type Props = {
  iconId?: string
  size?: number
}

export const PasswordIcon: FC<Props> = ({ iconId, size }) => {
  return (
    <svg
      fill={'none'}
      height={size}
      viewBox={'0 0 24 24'}
      width={size}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${sprite}#${iconId}`} />
    </svg>
  )
}
