import { FC, ReactNode, useState } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import s from './dropDown.module.scss'
import profileImage from '@/asserts/profileImage.png'

export type DropDown = {
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  className?: string
  trigger?: boolean
  sideOffset?: number
}

export const DropDownWrapper: FC<DropDown> = ({
  className,
  children,
  trigger,
  align = 'end',
  sideOffset,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenuRadix.Root open={open} onOpenChange={setOpen}>
      <DropdownMenuRadix.Trigger className={s.trigger} asChild>
        {trigger && <img alt={''} className={s.triggerImg} src={profileImage} />}
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          align={align}
          className={`${s.content} ${className}`}
          loop
          sideOffset={sideOffset}
        >
          {children}
          <DropdownMenuRadix.Arrow className={s.arrow} />
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}
