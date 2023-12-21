import {FC, ReactNode, useState} from 'react'
import {EditIcon} from '@/asserts/icons/components/EditIcon.tsx'
import {LearnIcon} from '@/asserts/icons/components/LearnIcon.tsx'
import {ProfileIcon} from '@/asserts/icons/components/ProfileIcon.tsx'
import {SignOutIcon} from '@/asserts/icons/components/SignOutIcon.tsx'
import {Typography} from '@/components/ui/typography'
import * as DropdownRadix from '@radix-ui/react-dropdown-menu'
import s from './dropDown.module.scss'
import {MoreIcon} from '@/asserts/icons/components/MoreIcon.tsx'
import {useLogOutMutation} from '@/api/auth-api/auth.api.ts'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {DeleteIcon} from "@/asserts/icons/components/DeleteIcon.tsx";
import {DeleteDeckModal} from "@/components/ui/decks/components/deleteDeckModal";
import {useDeleteDeckMutation, useGetDecksByIdQuery} from "@/api/decks/decks.api.ts";

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
                    <img alt={''} className={s.triggerImg} src={avatar} tabIndex={0}/>
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

export const DropDownMenu: FC<DropDownMenuProps> = ({avatar, email, name}) => {
    const [logout] = useLogOutMutation()
    const onClickLogOut = () => {
        logout()
    }

    return (
        <DropDown avatar={avatar} name={name} sideOffset={-1} trigger={'imageAvatar'}>
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
            <ItemWithIcon linkTo={'/profile'} icon={<ProfileIcon/>} text={'Profile'}/>
            <ItemWithIcon onClick={onClickLogOut} icon={<SignOutIcon/>} text={'Sign Out'}/>
        </DropDown>
    )
}
export const DropDownPackMenu = () => {
    const [open, setOpen] = useState(false)
    const {id} = useParams()
    const {data: decksById} = useGetDecksByIdQuery(id!)
    const navigate = useNavigate()
    const handleDeleteDeckClick = () => {
        setOpen(!open)
        // navigate('/')
    }
    return (
        <>
            <DropDown className={s.cardsContent} trigger={'iconMore'}>
                <ItemWithIcon linkTo={`/${id}/learn`} icon={<LearnIcon/>} text={'Learn'}/>
                <ItemWithIcon icon={<EditIcon/>} text={'Edit'}/>
                <ItemWithIcon icon={<DeleteIcon/>} onClick={handleDeleteDeckClick} text={'Delete'}/>
            </DropDown>
            <DeleteDeckModal deck={decksById!} setOpen={setOpen} open={open}/>
        </>
    )
}
