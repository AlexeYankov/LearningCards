import {useState} from 'react'
import {Modal, ModalDescription, ModalTitle} from '@/components/ui/modal'
import {DeleteIcon} from '@/asserts/icons/components/DeleteIcon.tsx'
import {Typography} from '@/components/ui/typography'
import s from '@/components/ui/decks/decksPage.module.scss'
import {Button} from '@/components/ui/button'
import {CardsResponseType, useDeleteCardMutation} from "@/api/common.api.ts";

type DeleteCardModel = {
    card: CardsResponseType
}

export const DeleteCardModal = ({ card }: DeleteCardModel) => {
    const [open, setOpen] = useState(false)
    const [deleteCard] = useDeleteCardMutation()
    const handleCloseModal = () => {
        setOpen(prevState => !prevState)
    }

    const handleDeleteDeckClick = () => {
        deleteCard(card.id!)
        handleCloseModal()
    }
    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            triggerName={
                <button>
                    <DeleteIcon />
                </button>
            }
        >
            <ModalTitle title={'Delete Card'} />

            <ModalDescription>
                <Typography variant={'body1'} as={'p'}>
                    Do you really want to remove this card?
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
                    Delete Card
                </Button>
            </div>
        </Modal>
    )
}
