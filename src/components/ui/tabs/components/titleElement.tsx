import s from './titleElement.module.scss'

import { Typography } from '../../typography'
import { useAppDispatch } from '@/api/store.ts'
import { changeCurrentPage, changeShowAuthorTabDecks } from '@/api/decks/pagination.reducer'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { useEffect } from 'react'

type TitleElementType = {
  active: number
  index: number
  length: number
  setActive: (value: number) => void
  title: string
}

export const TitleElement = ({ active, index, length, setActive, title }: TitleElementType) => {
  const dispatch = useAppDispatch()

  const { data } = useMeQuery()

  const handleChangeOrderByClick = (value: number) => {
    dispatch(changeShowAuthorTabDecks({ authorId: data.id }))
    dispatch(changeCurrentPage({ currentPage: 1 }))
    setActive(value)
    if (value === 1) {
      dispatch(changeShowAuthorTabDecks({ authorId: '' }))
    }
  }

  useEffect(() => {}, [title])

  return (
    <Typography
      as={'li'}
      className={`${s.container} ${active === index && s.containerActive} ${
        index === length - 1 && s.end
      }`}
      onClick={() => handleChangeOrderByClick(index)}
      tabIndex={0}
    >
      <Typography variant={'body1'}>{title}</Typography>
    </Typography>
  )
}
