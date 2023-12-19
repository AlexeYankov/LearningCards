import { Typography } from '@/components/ui/typography'
import s from '../../cardsPage.module.scss'
import { FC } from 'react'
import { DropDownPackMenu } from '@/components/ui/dropDown/dropDown'
import { useNavigate } from 'react-router-dom'
import { AddEditCard } from '@/components/ui/cards/components/addEditCard/addEditCard.tsx'
import { Button } from '@/components/ui/button'

type PageNameProps = {
  isMyCard?: boolean
  id?: string
  packTitle?: string
}

export const PageName: FC<PageNameProps> = ({ id, isMyCard, packTitle }) => {
  const navigate = useNavigate()
  const toLearn = () => {
    navigate(`/${id}/learn`)
  }
  return (
    <div className={s.container__pageName}>
      <Typography as={'h1'} variant={'large'} className={s.textWithIconBox}>
        <div>{packTitle} </div>
        <div className={s.dropDownBox}>{isMyCard && <DropDownPackMenu />}</div>
      </Typography>
      <div>
        {isMyCard ? <AddEditCard id={id} /> : <Button onClick={toLearn}>Learn to pack</Button>}
      </div>
    </div>
  )
}
