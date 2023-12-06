import { ResponseDeckType, useDeleteDeckMutation } from '@/api/decks/decks.api.ts'
import { useState } from 'react'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import { DeleteIcon } from '@/asserts/icons/components/DeleteIcon.tsx'
import { Typography } from '@/components/ui/typography'
import s from '@/components/ui/decks/decksPage.module.scss'
import { Button } from '@/components/ui/button'

type DeleteDeckModalProps = {
  deck: ResponseDeckType
}

export const DeleteDeckModal = ({ deck }: DeleteDeckModalProps) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => {
    setOpen(prevState => !prevState)
  }

  const handleDeleteDeckClick = () => {
    deleteDeck(deck.id!)
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
      <ModalTitle title={'Delete Pack'} />

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
