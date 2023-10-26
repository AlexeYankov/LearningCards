import { ComponentPropsWithoutRef, FC, forwardRef, ReactNode } from 'react'
import * as DialogRadix from '@radix-ui/react-dialog'
import { Typography } from '@/components/typography'
import { Close } from '@/asserts/icons/components/Close'
import s from './modal.module.scss'
import { Button } from '@/components/button'

export const Modal = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof DialogRadix.Root>>(
  (props, ref) => {
    const { modal, children, open, onOpenChange, ...rest } = props
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
            <DialogRadix.Content className={s.dialogContent} {...rest} ref={ref}>
              {children}
            </DialogRadix.Content>
          </DialogRadix.Portal>
        </DialogRadix.Root>
      </div>
    )
  }
)

type ModalTitleProps = {
  title?: string
}

export const ModalTitle: FC<ModalTitleProps> = ({ title }) => {
  return (
    <DialogRadix.Title className={s.dialogTitle}>
      <Typography variant={'heading2'} as={'h2'}>
        {title}
      </Typography>
      <ModalClose />
    </DialogRadix.Title>
  )
}

export const ModalClose = () => {
  return (
    <DialogRadix.Close aria-label="Close">
      <button className={s.dialogClose}>
        <Close size={24} />
      </button>
    </DialogRadix.Close>
  )
}

type ModalDescriptionProps = {
  children?: ReactNode
}

export const ModalDescription: FC<ModalDescriptionProps> = ({ children }) => {
  return <DialogRadix.Description className={s.description}>{children}</DialogRadix.Description>
}
