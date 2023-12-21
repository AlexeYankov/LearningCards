import { Typography } from '@/components/ui/typography'
import s from '../../cardsPage.module.scss'
import { FC } from 'react'
import { DropDownPackMenu } from '@/components/ui/dropDown'
import { useNavigate } from 'react-router-dom'
import { AddEditCard } from '@/components/ui/cards'
import { Button } from '@/components/ui/button'

type PageNameProps = {
  isMyCard?: boolean
  id?: string
  packTitle?: string
  cardsCount: number
}

export const PageName: FC<PageNameProps> = ({ id, cardsCount, isMyCard, packTitle }) => {
  const navigate = useNavigate()
  const toLearn = () => {
    navigate(`/${id}/learn`)
  }

  return (
    <div className={s.container__pageName}>
      <Typography as={'h1'} variant={'large'} className={s.textWithIconBox}>
        <div>{packTitle} </div>
        {isMyCard && <DropDownPackMenu />}
      </Typography>
      <div>
        {isMyCard ? (
          <AddEditCard id={id} />
        ) : (
          cardsCount !== 0 && <Button onClick={toLearn}>Learn to pack</Button>
        )}
      </div>
    </div>
  )
}
