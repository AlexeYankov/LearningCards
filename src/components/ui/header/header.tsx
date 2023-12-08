import logo from '@/asserts/Logo.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/dropDown/dropDown'
import { Typography } from '@/components/ui/typography'
import s from './header.module.scss'
import style from '../../../app.module.scss'
import userImg from '../../../asserts/userImg.png'
import { FC } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useMeQuery } from '@/api/auth-api/auth.api.ts'
import { useAppDispatch } from '@/api/store.ts'
import { resetFilter } from '@/api/decks/decks.reducer.ts'

export const Header: FC = () => {
  const dispatch = useAppDispatch()

  const { data, isSuccess, isLoading } = useMeQuery()
  const isLoggedIn = isSuccess

  const handleResetFilter = () => {
    dispatch(resetFilter())
  }
  return (
    <div className={s.container}>
      <header className={s.header}>
        <Typography as={Link} to={'/'} tabIndex={0} className={s.logoBox}>
          <img alt={''} className={s.logo} src={logo} onClick={handleResetFilter} />
        </Typography>
        <div className={s.textHeader}>
          {!isLoading && (
            <>
              {isLoggedIn && (
                <DropDownMenu
                  avatar={data?.avatar || userImg}
                  email={data?.email}
                  name={data?.name}
                />
              )}
              {!isLoggedIn && (
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
    </div>
  )
}

export const Layout = () => {
  const { isLoading, isSuccess } = useMeQuery()
  return (
    <>
      <Header />
      {!isLoading && (
        <div className={style.container}>
          {isSuccess && <Navigate to={'/'} />}
          <Outlet />
        </div>
      )}
    </>
  )
}
