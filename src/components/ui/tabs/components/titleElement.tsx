import s from './titleElement.module.scss'

import { Typography } from '@/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { changeShowAuthorTabDecks, resetFilter } from '@/api/decks'
import { useMeQuery } from '@/api/auth'
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
  const authorId = useAppSelector(state => state.decks.authorId)

  const { data } = useMeQuery()

  const handleChangeOrderByClick = (value: number) => {
    dispatch(changeShowAuthorTabDecks({ authorId: data!.id }))
    localStorage.removeItem('page')
    dispatch(resetFilter())
    setActive(value)
    if (value === 1) {
      dispatch(changeShowAuthorTabDecks({ authorId: '' }))
    }
  }

  useEffect(() => {
    if (authorId === '') {
      setActive(1)
    }
  }, [authorId])

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
