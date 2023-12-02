import logo from '@/asserts/Logo.png'
import {Button} from '@/components/ui/button'
import {DropDownMenu} from '@/components/ui/dropDown/dropDown'
import {Typography} from '@/components/ui/typography'
import s from './header.module.scss'
import style from '../../../app.module.scss'
import profileImage from '../../../asserts/profileImage.png'
import {FC} from 'react'
import {Link, Navigate, Outlet} from "react-router-dom";
import {useMeQuery} from "@/api/auth-api/auth.api.ts";


export const Header: FC = () => {
    const {data, isSuccess, isLoading} = useMeQuery()
    const isLoggedIn = isSuccess
    return (
        <div className={s.container}>
            <header className={s.header}>
                <Typography as={Link} to={'/'}>
                    <img alt={''} className={s.logo} src={logo}/>
                </Typography>
                <div className={s.textHeader}>
                    {!isLoading &&
                        <>
                            {isLoggedIn &&
                                <DropDownMenu avatar={data?.avatar || profileImage} email={data?.email}
                                              name={data?.name}/>}
                            {!isLoggedIn &&
                                <Button
                                    children={
                                        <Typography
                                            as={Link}
                                            to={'/login'}
                                            children={'Sign In'}
                                            variant={'subtitle2'}
                                        />}
                                    className={s.button}
                                    fullWidth
                                    variant={'primary'}
                                />}
                        </>}
                </div>
            </header>
        </div>
    )
}


export const Layout = () => {
    const {isLoading, isSuccess} = useMeQuery()
    return (
        <>
            <Header/>
            {!isLoading &&
                <div className={style.container}>
                    {isSuccess && <Navigate to={'/'}/>}
                    <Outlet/>
                </div>
            }
        </>
    )
}





