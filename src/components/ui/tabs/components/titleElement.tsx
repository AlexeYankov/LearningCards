import { Typography } from '../../typography'
import s from './titleElement.module.scss'

type TitleElementType = {
  title: string
  index: number
  length: number
  active: number
  setActive: (value: number) => void
}

export const TitleElement = ({ active, title, index, length, setActive }: TitleElementType) => {
  return (
    <Typography
      as="li"
      className={`${s.container} ${active === index && s.containerActive} ${
        index === length - 1 && s.end
      }`}
      tabIndex={index}
      onClick={() => setActive(index)}
    >
      <Typography variant="body1">{title}</Typography>
    </Typography>
  )
}
