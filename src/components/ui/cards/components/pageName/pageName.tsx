import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'
import {FC} from 'react'
import {DropDownPackMenu} from '@/components/ui/dropDown/dropDown'
import {Modal} from "@/components/ui/modal";
import {Learn1} from "@/components/ui/cards/components/learnPack/learnPack.tsx";

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
                <Modal
                    triggerName={
                        <Button>{isMyDeck ? 'Add New Card' : 'Learn to Pack'}</Button>
                    }
                >
                    <Learn1/>
                </Modal>

            </div>
        </div>
    )
}
