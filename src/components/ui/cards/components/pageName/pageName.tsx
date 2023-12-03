import { Typography } from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'
import { FC } from 'react'
import { DropDownPackMenu } from '@/components/ui/dropDown/dropDown'
import {AddCard} from "@/components/ui/cards/components/addCard/addCard.tsx";


type PageNameProps = {
  isMyCard?: boolean
  id: string | undefined
}

export const PageName: FC<PageNameProps> = ({ id, isMyCard }) => {
  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
        {isMyCard ? 'My Pack' : 'Friend’s Pack'}
        {isMyCard && <DropDownPackMenu />}
      </Typography>
      <div>
        <AddCard id={id} />
      </div>
    </div>
  )
}
