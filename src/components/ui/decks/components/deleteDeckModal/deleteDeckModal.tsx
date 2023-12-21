import { ResponseDeckType, useDeleteDeckMutation } from '@/api/decks'
import { useState } from 'react'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import { DeleteIcon } from '@/asserts/icons'
import { Typography } from '@/components/ui/typography'
import s from '@/components/ui/decks/decksPage.module.scss'
import { Button } from '@/components/ui/button'
import {useNavigate} from "react-router-dom";

type DeleteDeckModalProps = {
    deck: ResponseDeckType
    open?: boolean
    setOpen?: (open: boolean) => void
    hover?: boolean
}

export const DeleteDeckModal = ({deck, setOpen, open, hover}: DeleteDeckModalProps) => {

    // const openD = useAppSelector(state => state.decks.open)
    const [deleteDeck] = useDeleteDeckMutation()
    const [openLocal, setOpenLocal] = useState(false)

    const handleCloseModal = () => {
        // setOpen(prevState => !prevState)
        setOpen ? setOpen(false)  :setOpenLocal(prevState => !prevState)
    }

    const navigate = useNavigate()
    const handleDeleteDeckClick = () => {
        deleteDeck(deck.id!)
        handleCloseModal()
        navigate('/')
    }
    return (
        <Modal
            hover={hover}
            open={open ? open : openLocal}
            onOpenChange={setOpen ? setOpen : setOpenLocal}
            triggerName={
                <button>
                    <DeleteIcon/>
                </button>
            }
        >
            <ModalTitle title={'Delete Pack'}/>

            <ModalDescription>
                <Typography variant={'body1'} as={'p'}>
                    Do you really want to remove <span className={s.boldText}>{deck.name}</span>?
                </Typography>
                <Typography variant={'body1'} as={'p'}>
                    All cards will be deleted.
                </Typography>
            </ModalDescription>
            <div className={`${s.contentBtn} ${s.contentBtns}`}>
                <Button
                    classNameBtnBox={s.btnBox}
                    onClick={handleCloseModal}
                    variant={'secondary'}
                    type={'button'}
                >
                    Cancel
                </Button>
                <Button
                    classNameBtnBox={s.btnBox}
                    onClick={handleDeleteDeckClick}
                    variant={'primary'}
                    type={'submit'}
                >

                    Delete Pack
                </Button>
            </div>
        </Modal>
    )
}
