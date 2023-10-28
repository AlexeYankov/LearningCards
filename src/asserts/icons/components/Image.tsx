import sprite from '@/asserts/sprite.svg'

export const Image = () => {
  return (
    <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
      <use xlinkHref={`${sprite}#image-outline`} />
    </svg>
  )
}
