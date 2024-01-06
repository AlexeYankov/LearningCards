import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { useLogOutMutation } from '@/api/auth'
import { useGetDecksByIdQuery } from '@/api/decks'
import {
  DeleteIcon,
  EditIcon,
  LearnIcon,
  MoreIcon,
  ProfileIcon,
  SignOutIcon,
} from '@/asserts/icons'
import { DeleteDeckModal, EditDeckModal } from '@/components/ui/decks'
import { Typography } from '@/components/ui/typography'
import * as DropdownRadix from '@radix-ui/react-dropdown-menu'

import s from './dropDown.module.scss'

type DropDownProps = {
  align?: 'center' | 'end' | 'start'
  avatar?: string
  children: ReactNode
  className?: string
  name?: string
  sideOffset?: number
  trigger?: 'iconMore' | 'imageAvatar'
}

export const DropDown: FC<DropDownProps> = ({
  align = 'end',
  avatar,
  children,
  className,
  name,
  sideOffset,
  trigger,
}) => {
  const [open, setOpen] = useState(false)
  const handleCloseDropdown = () => {
    setOpen(false)
  }

  return (
    <DropdownRadix.Root onOpenChange={setOpen} open={open}>
      <Link className={s.headerLinkToProfile} to={'/profile'}>
        {name}
      </Link>
      <DropdownRadix.Trigger
        asChild
        className={`${trigger === 'imageAvatar' ? s.trigger : s.triggerIcon}`}
      >
        {trigger === 'imageAvatar' ? (
          <img alt={''} className={s.triggerImg} src={avatar} tabIndex={0} />
        ) : (
          <MoreIcon />
        )}
      </DropdownRadix.Trigger>
      <DropdownRadix.Portal>
        <DropdownRadix.Content
          align={align}
          className={`${s.content} ${className}`}
          loop
          onClick={handleCloseDropdown}
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
  icon?: ReactNode
  linkTo?: string
  onClick?: () => void
  text?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
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
  className,
  icon,
  linkTo,
  onClick,
  text,
  variant = 'caption',
}) => {
  return (
    <DropdownRadix.Item asChild className={`${s.item} ${className}`} onClick={onClick}>
      <Link className={s.menuItemIcon} to={linkTo!}>
        {icon}
        {children}
        <Typography variant={variant}>{text}</Typography>
      </Link>
    </DropdownRadix.Item>
  )
}

type DropDownMenuProps = {
  avatar?: string
  email?: string
  name?: string
}

export const DropDownMenu: FC<DropDownMenuProps> = ({ avatar, email, name }) => {
  const [logout] = useLogOutMutation()
  const onClickLogOut = () => {
    logout()
  }
  const { t } = useTranslation()

  return (
    <DropDown avatar={avatar} name={name} sideOffset={-1} trigger={'imageAvatar'}>
      <div className={s.inner}>
        <img alt={''} className={s.img} src={avatar} />
        <div>
          <Typography as={'p'} variant={'subtitle2'}>
            {name}
          </Typography>
          <Typography className={s.email} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </div>
      <ItemWithIcon icon={<ProfileIcon />} linkTo={'/profile'} text={t('profile')} />
      <ItemWithIcon icon={<SignOutIcon />} onClick={onClickLogOut} text={t('sign_out')} />
    </DropDown>
  )
}
export const DropDownPackMenu = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const { data: decksById } = useGetDecksByIdQuery(id!)
  const [openDelete, setOpenDelete] = useState(false)
  const [opeEdit, setOpenEdit] = useState(false)
  const handleDeleteDeckClick = () => {
    setOpenDelete(!openDelete)
  }
  const handleEditDeckClick = () => {
    setOpenEdit(!opeEdit)
  }

  return (
    <>
      <DropDown className={s.cardsContent} trigger={'iconMore'}>
        <ItemWithIcon icon={<LearnIcon />} linkTo={`/${id}/learn`} text={t('learn')} />
        <ItemWithIcon icon={<EditIcon />} onClick={handleEditDeckClick} text={t('edit')} />
        <ItemWithIcon icon={<DeleteIcon />} onClick={handleDeleteDeckClick} text={t('delete')} />
      </DropDown>
      <EditDeckModal deck={decksById!} hover={false} open={opeEdit} setOpen={setOpenEdit} />
      <DeleteDeckModal deck={decksById!} hover={false} open={openDelete} setOpen={setOpenDelete} />
    </>
  )
}
