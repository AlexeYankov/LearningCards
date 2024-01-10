import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useSearchParams } from 'react-router-dom'

import { useMeQuery } from '@/api/auth'
import { resetFilter } from '@/api/decks'
import { useAppDispatch } from '@/api/store'
import logo from '@/asserts/Logo.svg'
import userImg from '@/asserts/userImg.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/dropDown'
import { Progress } from '@/components/ui/loader'
import { SwitchLang } from '@/components/ui/switchLang/switchLang'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'
import style from '@/app.module.scss'

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const { data, error, isFetching, isLoading } = useMeQuery()
  const { t } = useTranslation()
  const handleResetFilter = () => {
    dispatch(resetFilter())
    localStorage.removeItem('searchValue')
    localStorage.removeItem('page')
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <Typography as={Link} className={s.logoBox} tabIndex={0} to={'/'}>
          <img alt={''} className={s.logo} onClick={handleResetFilter} src={logo} />
        </Typography>
        <div className={s.textHeader}>
          {!isLoading && (
            <>
              <SwitchLang />
              {!error && (
                <DropDownMenu
                  avatar={data?.avatar || userImg}
                  email={data?.email}
                  name={data?.name}
                />
              )}
              {error && (
                <Button className={s.button} fullWidth variant={'primary'}>
                  <Typography
                    as={Link}
                    className={s.linkSignIn}
                    to={'/login'}
                    variant={'subtitle2'}
                  >
                    {t('sign_in')}
                  </Typography>
                </Button>
              )}
            </>
          )}
        </div>
      </header>
      {isFetching && <Progress />}
    </div>
  )
}

export const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      lang: localStorage.getItem('lang') || '',
      page: localStorage.getItem('page') || '1',
    })
  }, [searchParams, setSearchParams])

  return (
    <>
      <Header />
      <div className={style.container}>
        <Outlet />
      </div>
    </>
  )
}
