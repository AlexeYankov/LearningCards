import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'

export const PageName = () => {
  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'}>
        My Pack
      </Typography>
      <div>
        <Button>Add New Card</Button>
      </div>
    </div>
  )
}
