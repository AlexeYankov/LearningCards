import logo from '@/asserts/Logo.png'
import {Button} from '@/components/ui/button'
import {DropDownMenu} from '@/components/ui/dropDown/dropDown'
import {Typography} from '@/components/ui/typography'
import s from './header.module.scss'
import style from '../../../app.module.scss'
import profileImage from '../../../asserts/profileImage.png'
import {FC} from 'react'
import {Link, Outlet} from "react-router-dom";
import {useMeQuery} from "@/api/auth-api/auth.api.ts";


export const Header: FC = () => {
    const {isError, isLoading} = useMeQuery()
    const isLoggedIn = !isError
    return (
        <div className={s.container}>
            <header className={s.header}>
                <img alt={''}  className={s.logo} src={logo}/>
                {!isLoading &&
                    <div className={s.textHeader}>
                        <>
                            {isLoggedIn ? (
                                    <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} name={'Ivan'}/>
                            ) : (
                                <Button
                                    children={<Typography as={Link} to={'/login'} children={'Sign In'}
                                                          variant={'subtitle2'}/>}
                                    className={s.button}
                                    fullWidth
                                    variant={'primary'}
                                />
                            )}
                        </>
                    </div>
                }

            </header>
        </div>
    )
}


export const Layout = () => {

    return (
        <>
            <Header/>
            <div className={style.container}>
                <Outlet/>
            </div>

        </>
    )
}





