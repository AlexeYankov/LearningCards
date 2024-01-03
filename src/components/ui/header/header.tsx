import logo from '@/asserts/Logo.svg'
import {Button} from '@/components/ui/button'
import {DropDownMenu} from '@/components/ui/dropDown'
import {Typography} from '@/components/ui/typography'
import s from './header.module.scss'
import style from '@/app.module.scss'
import userImg from '@/asserts/userImg.png'
import {FC} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useMeQuery} from '@/api/auth'
import {useAppDispatch} from '@/api/store'
import {resetFilter} from '@/api/decks'
import {Progress} from '@/components/ui/loader'

export const Header: FC = () => {
    const dispatch = useAppDispatch()
    const {data, error, isLoading, isFetching} = useMeQuery()
    const handleResetFilter = () => {
        dispatch(resetFilter())
        localStorage.removeItem('searchValue')
        localStorage.removeItem('page')
    }
    return (
        <div className={s.container}>
            <header className={s.header}>
                <Typography as={Link} to={'/'} tabIndex={0} className={s.logoBox}>
                    <img alt={''} className={s.logo} src={logo} onClick={handleResetFilter}/>
                </Typography>
                <div className={s.textHeader}>
                    {!isLoading && (
                        <>
                            {!error && (
                                <DropDownMenu
                                    avatar={data?.avatar || userImg}
                                    email={data?.email}
                                    name={data?.name}
                                />
                            )}
                            {error && (
                                <Button
                                    children={
                                        <Typography
                                            className={s.linkSignIn}
                                            as={Link}
                                            to={'/login'}
                                            children={'Sign In'}
                                            variant={'subtitle2'}
                                        />
                                    }
                                    className={s.button}
                                    fullWidth
                                    variant={'primary'}
                                />
                            )}

                        </>
                    )}
                </div>

            </header>
            {isFetching && <Progress/>}
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
