import {FC, ReactNode, useState} from 'react'

import {Delete} from '@/asserts/icons/components/Delete'
import {Edit} from '@/asserts/icons/components/Edit'
import {Learn} from '@/asserts/icons/components/Learn'
import {Profile} from '@/asserts/icons/components/Profile'
import {SignOut} from '@/asserts/icons/components/SignOut'
import {Typography} from '@/components/ui/typography'
import * as DropdownRadix from '@radix-ui/react-dropdown-menu'
import s from './dropDown.module.scss'
import {MoreIcon} from '@/asserts/icons/components/More'
import style from '../header/header.module.scss'
import {useLogOutMutation} from '@/api/auth-api/auth.api.ts'
import {Link, useNavigate} from 'react-router-dom'

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
            <DropdownRadix.Trigger>
                {trigger && (
                    <Typography as={'p'} className={style.headerName} variant={'subtitle1'}>
                        {name}
                    </Typography>
                )}
            </DropdownRadix.Trigger>
            <DropdownRadix.Trigger
                asChild
                className={`${trigger === 'imageAvatar' ? s.trigger : s.triggerIcon}`}
            >
                {trigger === 'imageAvatar' ? (
                    <img alt={''} className={s.triggerImg} src={avatar}/>
                ) : (
                    <MoreIcon/>
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
                    <DropdownRadix.Arrow className={s.arrow}/>
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
            <div className={s.menuItem}>
                <Link to={linkTo!} className={s.menuItemIcon}>
                    {icon}
                    {children}
                    <Typography variant={variant}>{text}</Typography>
                </Link>
            </div>
        </DropdownRadix.Item>
    )
}


type DropDownMenuProps = {
    avatar?: string
    email?: string
    name?: string
}

export const DropDownMenu: FC<DropDownMenuProps> = ({avatar, email, name}) => {
    const [logout] = useLogOutMutation()
    const navigate = useNavigate()
    const onClickLogOut = () => {
        logout()
    }
    const onClickToProfile = () => {
        navigate('/profile')
    }
    return (
        <DropDown avatar={avatar} name={name} sideOffset={0} trigger={'imageAvatar'}>
            <ItemWithIcon className={s.itemProfile}>
                <div className={s.inner}>
                    <img alt={''} className={s.img} src={avatar}/>
                    <div className={s.itemBox}>
                        <Typography as={'p'} variant={'subtitle2'}>
                            {name}
                        </Typography>
                        <Typography className={s.email} variant={'caption'}>
                            {email}
                        </Typography>
                    </div>
                </div>
            </ItemWithIcon>
            <ItemWithIcon onClick={onClickToProfile} icon={<Profile/>} text={'My Profile'}/>
            <ItemWithIcon onClick={onClickLogOut} icon={<SignOut/>} text={'Sign Out'}/>
        </DropDown>
    )
}

export const DropDownPackMenu = () => {
    return (
        <DropDown className={s.content} trigger={'iconMore'}>
            <ItemWithIcon icon={<Learn/>} text={'Learn'}/>
            <ItemWithIcon icon={<Edit/>} text={'Edit'}/>
            <ItemWithIcon icon={<Delete/>} text={'Delete'}/>
        </DropDown>
    )
}
