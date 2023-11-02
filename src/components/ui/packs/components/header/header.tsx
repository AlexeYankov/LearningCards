import s from '../../../editProfile/editProfile.module.scss'
import f from './header.module.scss'

import logo from '@/asserts/Logo.png'
import { DropDownMenu } from '@/components/ui/dropDown/dropDown'
import { Typography } from '@/components/ui/typography'

export const Header = () => {
  return (
    <div className={f.container}>
      <div className={s.container}>
        <header className={s.header}>
          <img alt={''} className={s.logo} src={logo} />
          <div className={s.textHeader}>
            <Typography as={'p'} variant={'subtitle1'} className={f.headerName}>
              Ivan
            </Typography>
            <DropDownMenu />
          </div>
        </header>
      </div>
    </div>
  )
}
