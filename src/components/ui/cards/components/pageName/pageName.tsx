import {Typography} from '@/components/ui/typography'

import f from '../../cardsPage.module.scss'
import {FC} from 'react'
import {DropDownPackMenu} from '@/components/ui/dropDown/dropDown'
import {AddCard} from "@/components/ui/cards/components/addCard/addCard.tsx";

type PageNameProps = {
    isMyDeck?: boolean
    id:string|undefined
}

export const PageName: FC<PageNameProps> = ({isMyDeck,id}) => {

    return (
        <div className={f.container__pageName}>
            <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
                {isMyDeck ? 'My Pack' : 'Friend’s Pack'}
                {isMyDeck && (
                    <DropDownPackMenu/>
                )}
            </Typography>
            <div>
                {/*<Button onClick={handleButtonClick}>{isMyDeck ? 'Add New Card' : 'Learn to Pack'}</Button>*/}
                {/*<Button>{on}</Button>*/}
                <AddCard id={id}/>
                {/*{isOpen && <AddCard/>}*/}
            </div>
        </div>
    )
}
