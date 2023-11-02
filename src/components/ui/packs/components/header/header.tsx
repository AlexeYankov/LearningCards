import s from '../../../editProfile/editProfile.module.scss'
import f from './header.module.scss'

import logo from '@/asserts/Logo.png'
import { DropDownMenu } from '@/components/ui/dropDown/dropDown'
import { Typography } from '@/components/ui/typography'
import profileImage from './../../../../../asserts/profileImage.png'
import { Button } from '@/components/ui/button'
import { FC } from 'react'

type Props = {
  isLoggedIn?: boolean
}

export const Header: FC<Props> = ({ isLoggedIn = true }) => {
  return (
    <div className={f.container}>
      <div className={s.container}>
        <header className={s.header}>
          <img alt={''} className={s.logo} src={logo} />
          <div className={s.textHeader}>
            <>
              {isLoggedIn ? (
                <>
                  <Typography as={'p'} variant={'subtitle1'} className={f.headerName}>
                    Ivan
                  </Typography>
                  <DropDownMenu name={'Ivan'} email={'j&johnson@gmail.com'} avatar={profileImage} />
                </>
              ) : (
                <Button
                  className={s.button}
                  variant={'primary'}
                  fullWidth
                  children={<Typography children={'Sign In'} variant={'subtitle2'} as={'p'} />}
                />
              )}
            </>
          </div>
        </header>
      </div>
    </div>
  )
}
