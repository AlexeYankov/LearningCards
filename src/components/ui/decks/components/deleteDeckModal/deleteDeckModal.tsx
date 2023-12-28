import { useDeleteDeckMutation } from '@/api/decks'
import { useState } from 'react'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import { DeleteIcon } from '@/asserts/icons'
import { Typography } from '@/components/ui/typography'
import s from '@/components/ui/decks/decksPage.module.scss'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ResponseDeckType } from '@/types/decks'

type DeleteDeckModalProps = {
  deck: ResponseDeckType
  open?: boolean
  setOpen?: (open: boolean) => void
  hover?: boolean
}

export const DeleteDeckModal = ({ deck, setOpen, open, hover }: DeleteDeckModalProps) => {
  const { t } = useTranslation()

  const [deleteDeck] = useDeleteDeckMutation()
  const [openLocal, setOpenLocal] = useState(false)

  const handleCloseModal = () => {
    setOpen ? setOpen(false) : setOpenLocal(prevState => !prevState)
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
          <DeleteIcon />
        </button>
      }
    >
      <ModalTitle title={t('delete_deck')} />

      <ModalDescription>
        <Typography variant={'body1'} as={'p'}>
          {t('delete_message')} <span className={s.boldText}>{deck.name}</span>?
        </Typography>
        <Typography variant={'body1'} as={'p'}>
          {t('delete_message_description')}
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
          {t('delete_deck')}
        </Button>
      </div>
    </Modal>
  )
}
