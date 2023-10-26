import { ComponentPropsWithoutRef, FC, forwardRef, ReactNode } from 'react'
import * as DialogRadix from '@radix-ui/react-dialog'
import { Typography } from '@/components/typography'
import { Close } from '@/asserts/icons/components/Close'
import s from './modal.module.scss'
import { Button } from '@/components/button'
import { ScrollBar } from '@/components/scrollbar'

type ModalProps = {
  className?: string
}

export const Modal = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogRadix.Root> & ModalProps
>((props, ref) => {
  const { modal, children, open, className, onOpenChange, ...rest } = props
  return (
    <div className={s.modal}>
      <DialogRadix.Root open={open} onOpenChange={onOpenChange}>
        <DialogRadix.Trigger className={s.dialogTrigger} asChild>
          <Button variant={'primary'} type={'button'}>
            Edit
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
    <DialogRadix.Title className={s.dialogTitle} asChild>
      <div>
        <Typography variant={'heading2'} as={'h2'}>
          {title}
        </Typography>
        <ModalClose />
      </div>
    </DialogRadix.Title>
  )
}

export const ModalClose = () => {
  return (
    <DialogRadix.Close className={s.dialogClose} asChild aria-label="Close">
      <Close size={24} />
    </DialogRadix.Close>
  )
}

type ModalDescriptionProps = {
  children?: ReactNode
}

export const ModalDescription: FC<ModalDescriptionProps> = ({ children }) => {
  return (
    <DialogRadix.Description className={s.description} asChild>
      <div>
        <ScrollBar maxHeight={'40vh'} children={children} />
      </div>
    </DialogRadix.Description>
  )
}