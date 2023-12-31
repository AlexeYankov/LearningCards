import { useState } from 'react'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import { DeleteIcon } from '@/asserts/icons'
import { Typography } from '@/components/ui/typography'
import s from '@/components/ui/decks/decksPage.module.scss'
import { Button } from '@/components/ui/button'
import { CardsResponseType, useDeleteCardMutation } from '@/api/cards'
import { toast } from 'react-toastify'
import { ErrorComponent } from '@/utils/toastify/Error'
import { useTranslation } from 'react-i18next'

type DeleteCardModel = {
  card: CardsResponseType
}

export const DeleteCardModal = ({ card }: DeleteCardModel) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [deleteCard] = useDeleteCardMutation()
  const handleCloseModal = () => {
    setOpen(prevState => !prevState)
  }

  const handleDeleteDeckClick = () => {
    toast.promise(deleteCard(card.id!), {
      pending: 'Uploading...',
      success: 'Your card successfully deleted',
      error: 'An error occurred while uploading',
    })
    handleCloseModal()
  }
  return (
    <>
      <ErrorComponent />
      <Modal
        open={open}
        onOpenChange={setOpen}
        triggerName={
          <button>
            <DeleteIcon />
          </button>
        }
      >
        <ModalTitle title={t('delete_card')} />

        <ModalDescription>
          <Typography variant={'body1'} as={'p'}>
            {t('message_delete_card')}
          </Typography>
        </ModalDescription>
        <div className={`${s.contentBtn} ${s.contentBtns}`}>
          <Button
            classNameBtnBox={s.btnBox}
            onClick={handleCloseModal}
            variant={'secondary'}
            type={'button'}
          >
            {t('cancel')}
          </Button>
          <Button
            classNameBtnBox={s.btnBox}
            onClick={handleDeleteDeckClick}
            variant={'primary'}
            type={'submit'}
          >
            {t('delete_card')}
          </Button>
        </div>
      </Modal>
    </>
  )
}
