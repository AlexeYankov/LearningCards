import logo from '@/asserts/Logo.png'
import {Button} from '@/components/ui/button'
import {DropDownMenu} from '@/components/ui/dropDown/dropDown'
import {Typography} from '@/components/ui/typography'
import s from './header.module.scss'
import style from '../../../app.module.scss'
import profileImage from '../../../asserts/profileImage.png'
import {FC} from 'react'
import {Outlet} from "react-router-dom";

type Props = {
    isLoggedIn?: boolean
}

export const Header: FC<Props> = ({isLoggedIn = true}) => {
    return (
        <div className={s.container}>
            <header className={s.header}>
                <img alt={''} className={s.logo} src={logo}/>
                <div className={s.textHeader}>
                    <>
                        {isLoggedIn ? (
                            <>
                                <Typography as={'p'} className={s.headerName} variant={'subtitle1'}>
                                    Ivan
                                </Typography>
                                <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} name={'Ivan'}/>
                            </>
                        ) : (
                            <Button
                                children={<Typography as={'p'} children={'Sign In'} variant={'subtitle2'}/>}
                                className={s.button}
                                fullWidth
                                variant={'primary'}
                            />
                        )}
                    </>
                </div>
            </header>
        </div>
    )
}


export const Layout = () => (
    <>
        <Header/>
        <div className={style.container}>
            <Outlet/>
        </div>

    </>
);





