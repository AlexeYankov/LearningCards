import { FC } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Typography } from '@/components/typography'
import { Close } from '@/asserts/icons/components/Close'
import s from './modal.module.scss'

type Props = {}

export const Modal: FC<Props> = ({}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={s.dialogTrigger} />
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <ModalTitle />
          <Dialog.Description />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const ModalTitle = ({}) => {
  return (
    <Dialog.Title className={s.dialogTitle}>
      <Typography variant={'heading2'} as={'h2'}>
        Title
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
