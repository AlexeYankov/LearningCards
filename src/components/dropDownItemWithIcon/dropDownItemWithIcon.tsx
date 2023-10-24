import * as DropdownRadix from '@radix-ui/react-dropdown-menu'

import s from './dropDownItemWithIcon.module.scss'
import { FC, ReactNode } from 'react'
import { Typography } from '@/components/typography'

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

export const DropDownItemWithIcon: FC<DropDownItemWithIcon> = ({
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
