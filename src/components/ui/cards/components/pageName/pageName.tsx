import { Typography } from '@/components/ui/typography'
import f from '../../cardsPage.module.scss'
import { FC } from 'react'
import { DropDownPackMenu } from '@/components/ui/dropDown/dropDown'
import { useNavigate } from 'react-router-dom'
import { AddEditCard } from '@/components/ui/cards/components/addEditCard/addEditCard.tsx'
import {Button} from "@/components/ui/button";

type PageNameProps = {
  isMyCard?: boolean
  id?: string
}

export const PageName: FC<PageNameProps> = ({ id, isMyCard }) => {
  const navigate = useNavigate()
  const toLearn = () => {
    navigate(`/${id}/learn`)
  }
  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
        {isMyCard ? 'My Pack' : 'Friend’s Pack'}
        {isMyCard && <DropDownPackMenu/>}
      </Typography>
      <div>{isMyCard ? <AddEditCard id={id} /> : <Button onClick={toLearn}>Learn to pack</Button>}</div>
    </div>
  )
}
