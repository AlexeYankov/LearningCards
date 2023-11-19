import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'
import { FC } from 'react'
import { Learn } from '@/asserts/icons/components/Learn'
import { Edit } from '@/asserts/icons/components/Edit'
import { Delete } from '@/asserts/icons/components/Delete'
import { DropDown, ItemWithIcon } from '@/components/ui/dropDown/dropDown'

type PageNameProps = {
  isMyDeck?: boolean
}

export const PageName: FC<PageNameProps> = ({ isMyDeck }) => {
  return (
    <div className={f.container__pageName}>
      <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
        {isMyDeck ? 'My Pack' : 'Friend’s Pack'}
        {isMyDeck && (
          <DropDown trigger={'iconMore'}>
            <ItemWithIcon className={f.itemBox} icon={<Learn />} text={'Learn'} />
            <ItemWithIcon className={f.itemBox} icon={<Edit />} text={'Edit'} />
            <ItemWithIcon className={f.itemBox} icon={<Delete />} text={'Delete'} />
          </DropDown>
        )}
      </Typography>
      <div>
        <Button>{isMyDeck ? 'Add New Card' : 'Learn to Pack'}</Button>
      </div>
    </div>
  )
}
