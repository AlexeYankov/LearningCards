import { Link } from 'react-router-dom'

import logo from '@/asserts/Logo.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/dropDown/dropDown'
import { Typography } from '@/components/ui/typography'

import s from '../editProfile/editProfile.module.scss'
import f from './header.module.scss'

import profileImage from '../../../asserts/profileImage.png'

type Props = {
  isLoggedIn?: boolean
}

export const Header: React.FC<Props> = ({ isLoggedIn = true }) => {
  return (
    <div className={f.container}>
      <div className={s.container}>
        <header className={s.header}>
          {/* <Link to="/"> */}
          <img alt={''} className={s.logo} src={logo} />
          {/* </Link> */}

          <div className={s.textHeader}>
            <>
              {isLoggedIn ? (
                <>
                  <Typography as={'p'} className={f.headerName} variant={'subtitle1'}>
                    Ivan
                  </Typography>
                  <DropDownMenu avatar={profileImage} email={'j&johnson@gmail.com'} name={'Ivan'} />
                </>
              ) : (
                <Button
                  children={<Typography as={'p'} children={'Sign In'} variant={'subtitle2'} />}
                  className={s.button}
                  fullWidth
                  variant={'primary'}
                />
              )}
            </>
          </div>
        </header>
      </div>
    </div>
  )
}
