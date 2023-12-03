import sprite from '@/asserts/sprite.svg'

export const ArrowUpIcon = () => {
  return (
    <svg viewBox={'0 0 24 24'} width={'12px'}>
      <use xlinkHref={`${sprite}#arrow-ios-Up`} />
    </svg>
  )
}
