import { FC, ReactNode, useState } from 'react'

import {
  DeleteIcon,
  EditIcon,
  LearnIcon,
  MoreIcon,
  ProfileIcon,
  SignOutIcon,
} from '@/asserts/icons'
import { Typography } from '@/components/ui/typography'
import * as DropdownRadix from '@radix-ui/react-dropdown-menu'
import s from './dropDown.module.scss'
import { useLogOutMutation } from '@/api/auth'
import { Link, useParams } from 'react-router-dom'
import { useGetDecksByIdQuery } from '@/api/decks'
import { DeleteDeckModal, EditDeckModal } from '@/components/ui/decks'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export type DropDown = {
  avatar?: string
  name?: string
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  className?: string
  sideOffset?: number
  trigger?: 'imageAvatar' | 'iconMore'
}

export const DropDown: FC<DropDown> = ({
  avatar,
  name,
  align = 'end',
  children,
  className,
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
          sideOffset={sideOffset}
          onClick={handleCloseDropdown}
        >
          {children}
          <DropdownRadix.Arrow className={s.arrow} />
        </DropdownRadix.Content>
      </DropdownRadix.Portal>
    </DropdownRadix.Root>
  )
}

export type DropDownItemWithIcon = {
  onClick?: () => void
  children?: ReactNode
  className?: string
  icon?: ReactNode
  text?: string
  linkTo?: string
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
  onClick,
  children,
  className,
  icon,
  text,
  variant = 'caption',
  linkTo,
}) => {
  return (
    <DropdownRadix.Item onClick={onClick} className={`${s.item} ${className}`} asChild>
      <Link to={linkTo!} className={s.menuItemIcon}>
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

export enum Lang {
  EN = 'en',
  RU = 'ru',
}

export const DropDownMenu: FC<DropDownMenuProps> = ({ avatar, email, name }) => {
  const [logout] = useLogOutMutation()
  const onClickLogOut = () => {
    logout()
  }

  const { t, i18n } = useTranslation()
  const toggleLanguage = async () => {
    const newLang = i18n.language === Lang.RU ? Lang.EN : Lang.RU
    i18n.changeLanguage(newLang)
  }

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
      <ItemWithIcon linkTo={'/profile'} icon={<ProfileIcon />} text={'Profile'} />
      <Button onClick={toggleLanguage}>{t('Language')}</Button>
      <ItemWithIcon onClick={onClickLogOut} icon={<SignOutIcon />} text={'Sign Out'} />
    </DropDown>
  )
}
export const DropDownPackMenu = () => {
  const { id } = useParams()
  const { data: decksById } = useGetDecksByIdQuery(id!)
  const [openDelete, setOpenDelete] = useState(false)
  const [opeEdit, setOpenEdit] = useState(false)
  // const navigate = useNavigate()
  const handleDeleteDeckClick = () => {
    setOpenDelete(!openDelete)
  }
  const handleEditDeckClick = () => {
    setOpenEdit(!opeEdit)
  }
  return (
    <>
      <DropDown className={s.cardsContent} trigger={'iconMore'}>
        <ItemWithIcon linkTo={`/${id}/learn`} icon={<LearnIcon />} text={'Learn'} />
        <ItemWithIcon icon={<EditIcon />} onClick={handleEditDeckClick} text={'Edit'} />
        <ItemWithIcon icon={<DeleteIcon />} onClick={handleDeleteDeckClick} text={'Delete'} />
      </DropDown>
      <EditDeckModal hover={false} deck={decksById!} setOpen={setOpenEdit} open={opeEdit} />
      <DeleteDeckModal hover={false} deck={decksById!} setOpen={setOpenDelete} open={openDelete} />
    </>
  )
}
