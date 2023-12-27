import { ResponseDeckType } from '@/api/decks'
import { useState } from 'react'
import { Modal, ModalDescription, ModalTitle } from '@/components/ui/modal'
import s from '@/components/ui/decks/decksPage.module.scss'
import { LearnIcon } from '@/asserts/icons'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type LearnDeckModalProps = {
  deck: ResponseDeckType
  isMyDeck: boolean
}

export const LearnDeckModal = ({ deck, isMyDeck }: LearnDeckModalProps) => {
  const { t } = useTranslation()

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
      <ModalTitle title={t('learn_deck')} />
      <ModalDescription>
        <Typography variant={'body1'} as={'p'}>
          {t('learn_message')} <span className={s.boldText}>{deck.name}</span>?
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
        <Link to={`/${deck.id}/learn`} className={s.link}>
          <Button classNameBtnBox={s.btnBox} variant={'primary'} type={'button'}>
            {t('learn_deck')}
          </Button>
        </Link>
      </div>
    </Modal>
  )
}
