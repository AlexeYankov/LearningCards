import {FC, useState} from 'react'
import s from './emptyPack.module.scss'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import {AddCard} from "@/components/ui/cards/components/addCard/addCard.tsx";

type EmptyPackPropsType = {
    packTitle: string
}

export const EmptyPack: FC<EmptyPackPropsType> = ({packTitle}) => {

    const [isOpen, setIsOpen] = useState(false)
    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Typography as={'h1'} variant={'large'} className={s.title}>
                {packTitle}
            </Typography>
            <Typography as={'p'} variant={'body1'} className={s.description}>
                This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button onClick={handleButtonClick} className={s.button}>Add New Card</Button>
            {isOpen && <AddCard/>}
        </>
    )
}
