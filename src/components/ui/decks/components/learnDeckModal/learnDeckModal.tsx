import { ResponseDeckType } from '@/api/decks/decks.api.ts'
import { useState } from 'react'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import s from '@/components/ui/decks/decksPage.module.scss'
import { LearnIcon } from '@/asserts/icons/components/LearnIcon.tsx'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

type LearnDeckModalProps = {
  deck: ResponseDeckType
  isMyDeck: boolean
}

export const LearnDeckModal = ({ deck, isMyDeck }: LearnDeckModalProps) => {
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => {
    setOpen(prevState => !prevState)
  }

  const emptyCardsInDeck = deck.cardsCount === 0

  const isBtnDisabled = emptyCardsInDeck || (isMyDeck && emptyCardsInDeck)

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      disabled={isBtnDisabled}
      triggerName={
        <button className={isBtnDisabled ? s.disabledIcon : ''}>
          <LearnIcon />
        </button>
      }
    >
      <ModalTitle title={'Learn Pack'} />
      <ModalDescription>
        <Typography variant={'body1'} as={'p'}>
          Do you really want to move on to learning more about the{' '}
          <span className={s.boldText}>{deck.name}</span>?
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
        <Button classNameBtnBox={s.btnBox} variant={'primary'} type={'button'}>
          Learn Pack
        </Button>
      </div>
    </Modal>
  )
}
