import { ComponentPropsWithoutRef, FC, forwardRef, ReactNode } from 'react'

import { Close } from '@/asserts/icons/components/Close'
import { ScrollBar } from '../scrollbar'
import { Button } from '../button'
import { Typography } from '@/components/ui/typography'
import * as DialogRadix from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalProps = {
  className?: string
  triggerName?: string
}

export const Modal = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogRadix.Root> & ModalProps
>((props, ref) => {
  const { children, className, modal, triggerName, onOpenChange, open, ...rest } = props

  return (
    <div className={s.modal}>
      <DialogRadix.Root onOpenChange={onOpenChange} open={open}>
        <DialogRadix.Trigger asChild className={s.dialogTrigger}>
          <Button type={'button'} variant={'primary'}>
            {triggerName}
          </Button>
        </DialogRadix.Trigger>
        <DialogRadix.Portal>
          <DialogRadix.Overlay className={s.dialogOverlay} />
          <DialogRadix.Content className={`${s.dialogContent} ${className}`} {...rest} ref={ref}>
            {children}
          </DialogRadix.Content>
        </DialogRadix.Portal>
      </DialogRadix.Root>
    </div>
  )
})

type ModalTitleProps = {
  title?: string
}

export const ModalTitle: FC<ModalTitleProps> = ({ title }) => {
  return (
    <DialogRadix.Title asChild className={s.dialogTitle}>
      <div>
        <Typography as={'h2'} variant={'heading2'}>
          {title}
        </Typography>
        <ModalClose />
      </div>
    </DialogRadix.Title>
  )
}

export const ModalClose = () => {
  return (
    <DialogRadix.Close aria-label={'Close'} className={s.dialogClose}>
      <Close size={24} />
    </DialogRadix.Close>
  )
}

type ModalDescriptionProps = {
  children?: ReactNode
}

export const ModalDescription: FC<ModalDescriptionProps> = ({ children }) => {
  return (
    <DialogRadix.Description asChild className={s.description}>
      <div>
        <ScrollBar children={children} maxHeight={'40vh'} />
      </div>
    </DialogRadix.Description>
  )
}
