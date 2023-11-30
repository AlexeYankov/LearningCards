import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'
import { FC } from 'react'
import { DropDownPackMenu } from '@/components/ui/dropDown/dropDown'

type PageNameProps = {
  isMyCard?: boolean
}

export const PageName: FC<PageNameProps> = ({ isMyCard }) => {
  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
        {isMyCard ? 'My Pack' : 'Friend’s Pack'}
        {isMyCard && <DropDownPackMenu />}
      </Typography>
      <div>
        <Button>{isMyCard ? 'Add New Card' : 'Learn to Pack'}</Button>
      </div>
    </div>
  )
}
