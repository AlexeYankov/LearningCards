import s from './titleElement.module.scss'

import { Typography } from '../../typography'

type TitleElementType = {
  active: number
  index: number
  length: number
  setActive: (value: number) => void
  title: string
}

export const TitleElement = ({ active, index, length, setActive, title }: TitleElementType) => {
  return (
    <Typography
      as={'li'}
      className={`${s.container} ${active === index && s.containerActive} ${
        index === length - 1 && s.end
      }`}
      onClick={() => setActive(index)}
      tabIndex={0}
    >
      <Typography variant={'body1'}>{title}</Typography>
    </Typography>
  )
}
