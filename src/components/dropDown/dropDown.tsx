import { FC, ReactNode, useState } from 'react'

import * as DropdownRadix from '@radix-ui/react-dropdown-menu'
import s from './dropDown.module.scss'
import profileImage from '@/asserts/profileImage.png'

import { Typography } from '@/components/typography'
import { Profile } from '@/asserts/icons/components/Profile'
import { SignOut } from '@/asserts/icons/components/SignOut'
import { Learn } from '@/asserts/icons/components/Learn'
import { Edit } from '@/asserts/icons/components/Edit'
import { Delete } from '@/asserts/icons/components/Delete'

export type DropDown = {
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  className?: string
  trigger?: boolean
  sideOffset?: number
}

export const DropDown: FC<DropDown> = ({
  className,
  children,
  trigger,
  align = 'end',
  sideOffset,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <DropdownRadix.Root open={open} onOpenChange={setOpen}>
      <DropdownRadix.Trigger className={s.trigger} asChild>
        {trigger && <img alt={''} className={s.triggerImg} src={profileImage} />}
      </DropdownRadix.Trigger>

      <DropdownRadix.Portal>
        <DropdownRadix.Content
          align={align}
          className={`${s.content} ${className}`}
          loop
          sideOffset={sideOffset}
        >
          {children}
          <DropdownRadix.Arrow className={s.arrow} />
        </DropdownRadix.Content>
      </DropdownRadix.Portal>
    </DropdownRadix.Root>
  )
}

export type DropDownItemWithIcon = {
  children?: ReactNode
  className?: string
  text?: string
  icon?: ReactNode
  variant?:
    | 'caption'
    | 'body1'
    | 'body2'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
}

export const ItemWithIcon: FC<DropDownItemWithIcon> = ({
  children,
  text,
  variant = 'caption',
  icon,
  className,
}) => {
  return (
    <DropdownRadix.Item className={`${s.item} ${className}`}>
      <div className={s.menuItem}>
        <div className={s.menuItemIcon}>
          {icon}
          {children}
          <Typography variant={variant}>{text}</Typography>
        </div>
      </div>
    </DropdownRadix.Item>
  )
}

export const DropDownMenu = () => {
  return (
    <DropDown sideOffset={4} trigger>
      <ItemWithIcon className={s.itemProfile}>
        <div className={s.inner}>
          <img alt={''} className={s.img} src={profileImage} />
          <div className={s.itemBox}>
            <Typography variant={'subtitle2'} as={'p'}>
              Ivan
            </Typography>
            <Typography className={s.email} variant={'caption'}>
              j&johnson@gmail.com
            </Typography>
          </div>
        </div>
      </ItemWithIcon>
      <ItemWithIcon icon={<Profile />} text="My Profile" />
      <ItemWithIcon icon={<SignOut />} text="Sign Out" />
    </DropDown>
  )
}

export const DropDownPackMenu = () => {
  return (
    <DropDown className={s.content} trigger>
      <ItemWithIcon icon={<Learn />} text="Learn" />
      <ItemWithIcon icon={<Edit />} text="Edit" />
      <ItemWithIcon icon={<Delete />} text="Delete" />
    </DropDown>
  )
}