import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'
import f from '../../cardsPage.module.scss'
import {FC} from 'react'
import {DropDownPackMenu} from '@/components/ui/dropDown/dropDown'
import {useNavigate} from "react-router-dom";

type PageNameProps = {
    isMyDeck?: boolean
    id?:string
}

export const PageName: FC<PageNameProps> = ({isMyDeck,id}) => {
    const navigate=useNavigate()
    const toLearn = () => {
        navigate(`/${id}/learn`)
    }
    return (
        <div className={f.container__pageName}>
            <Typography as={'h1'} variant={'large'} className={f.textWithIconBox}>
                {isMyDeck ? 'My Pack' : 'Friend’s Pack'}
                {isMyDeck && (
                    <DropDownPackMenu/>
                )}
            </Typography>
            <div>
                <Button onClick={toLearn}>{isMyDeck ? 'Add New Card' : 'Learn to Pack'}</Button>
            </div>

        </div>
    )
}
