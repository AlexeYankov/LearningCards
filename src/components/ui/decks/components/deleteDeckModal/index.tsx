import {ResponseDeckType, useDeleteDeckMutation} from '@/api/decks/decks.api.ts'
import {Modal, ModalDescription, ModalTitle} from '@/components/ui/modal'
import {DeleteIcon} from '@/asserts/icons/components/DeleteIcon.tsx'
import {Typography} from '@/components/ui/typography'
import s from '@/components/ui/decks/decksPage.module.scss'
import {Button} from '@/components/ui/button'
import {useNavigate} from "react-router-dom";

type DeleteDeckModalProps = {
    deck: ResponseDeckType
    open: boolean
    setOpen: (open: boolean) => void
}

export const DeleteDeckModal = ({deck, setOpen, open}: DeleteDeckModalProps) => {

    // const openD = useAppSelector(state => state.decks.open)
    const [deleteDeck] = useDeleteDeckMutation()
    // const [open, setOpen] = useState(false)

    const handleCloseModal = () => {
        // setOpen(prevState => !prevState)
        setOpen(false)
    }

    const navigate = useNavigate()
    const handleDeleteDeckClick = () => {
        deleteDeck(deck.id!)
        handleCloseModal()
        navigate('/')
    }
    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
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
