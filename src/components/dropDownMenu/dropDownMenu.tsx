import s from './dropDownMenu.module.scss'

import profileImage from '@/asserts/profileImage.png'
import { Typography } from '@/components/typography'
import { DropDownWrapper } from '@/components/dropDownWrapper'
import { DropDownItemWithIcon } from '@/components/dropDownItemWithIcon'
import { Profile } from '@/asserts/icons/components/Profile'
import { SignOut } from '@/asserts/icons/components/SignOut'

export const DropDownMenu = () => {
  return (
    <DropDownWrapper sideOffset={4} trigger>
      <DropDownItemWithIcon className={s.item}>
        <div className={s.inner}>
          <img alt={''} className={s.img} src={profileImage} />
          <div className={s.itemBox}>
            <Typography variant={'subtitle2'} as={'p'}>
              Ivan
            </Typography>
            <Typography className={s.email} variant={'caption'}>
              j&johnson@gmail.com
            </Typography>
          </div>
        </div>
      </DropDownItemWithIcon>
      <DropDownItemWithIcon icon={<Profile />} text="My Profile" />
      <DropDownItemWithIcon icon={<SignOut />} text="Sign Out" />
    </DropDownWrapper>
  )
}
