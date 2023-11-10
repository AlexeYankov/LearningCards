import s from './titleElement.module.scss'

import { Typography } from '../../typography'
import { useAppDispatch } from '@/api/store.ts'
import { changeShowTabDecks } from '@/api/decks/pagination.reducer'

type TitleElementType = {
  active: number
  index: number
  length: number
  setActive: (value: number) => void
  title: string
}

export const TitleElement = ({ active, index, length, setActive, title }: TitleElementType) => {
  const dispatch = useAppDispatch()

  const handleChangeShowTabDecksClick = (value: number) => {
    dispatch(changeShowTabDecks({ showMyTabDecks: !value }))
    setActive(value)
  }

  return (
    <Typography
      as={'li'}
      className={`${s.container} ${active === index && s.containerActive} ${
        index === length - 1 && s.end
      }`}
      onClick={() => handleChangeShowTabDecksClick(index)}
      tabIndex={0}
    >
      <Typography variant={'body1'}>{title}</Typography>
    </Typography>
  )
}
