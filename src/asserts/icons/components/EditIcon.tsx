import sprite from '@/asserts/sprite.svg'

export const EditIcon = () => {
  return (
    <svg fill={'white'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
      <use xlinkHref={`${sprite}#edit-2-outline`} />
    </svg>
  )
}
