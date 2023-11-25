import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'
import {FC} from 'react'
import {DropDownPackMenu} from '@/components/ui/dropDown/dropDown'

type PageNameProps = {
    isMyDeck?: boolean
}

export const PageName: FC<PageNameProps> = ({isMyDeck}) => {
    return (
        <div className={f.container__pageName}>
            <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
                {isMyDeck ? 'My Pack' : 'Friend’s Pack'}
                {isMyDeck && (
                    <DropDownPackMenu/>
                )}
            </Typography>
            <div>
                <Button>{isMyDeck ? 'Add New Card' : 'Learn to Pack'}</Button>
            </div>
        </div>
    )
}
