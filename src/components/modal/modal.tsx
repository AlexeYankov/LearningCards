import { FC } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Typography } from '@/components/typography'
import { Close } from '@/asserts/icons/components/Close'
import s from './modal.module.scss'
import { Button } from '@/components/button'

type Props = {}

export const Modal: FC<Props> = ({}) => {
  return (
    <div className={s.modal}>
      <Dialog.Root>
        <Dialog.Trigger className={s.dialogTrigger} asChild>
          <Button variant={'primary'} type={'button'}>
            Edit
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={s.dialogOverlay} />
          <Dialog.Content className={s.dialogContent}>
            <ModalTitle title={'Title'} />
            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

type ModalTitleProps = {
  title: string
}

export const ModalTitle: FC<ModalTitleProps> = ({ title }) => {
  return (
    <Dialog.Title className={s.dialogTitle}>
      <Typography variant={'heading2'} as={'h2'}>
        {title}
      </Typography>
      <ModalClose />
    </Dialog.Title>
  )
}

export const ModalClose = () => {
  return (
    <Dialog.Close asChild>
      <button className={s.dialogClose}>
        <Close size={24} />
      </button>
    </Dialog.Close>
  )
}
