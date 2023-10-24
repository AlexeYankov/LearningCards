import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

import profileImage from './../../asserts/profileImage.png'
import sprite from './../../asserts/sprite.svg'
import { Typography } from '@/components/typography'

export const DropDownMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.trigger}>
        <img alt={''} className={s.triggerImg} src={profileImage} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.content} loop sideOffset={12}>
          <DropdownMenu.Item className={`${s.item} `}>
            <div className={s.inner}>
              <img alt={''} className={s.img} src={profileImage} />
              <div className={s.itemBox}>
                <Typography variant={'subtitle2'} as={'a'}>
                  Ivan
                </Typography>
                <Typography className={s.email} variant={'caption'}>
                  j&johnson@gmail.com
                </Typography>
              </div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
                  <use xlinkHref={`${sprite}#person-outline`} />
                </svg>
              </div>
              <Typography variant={'caption'}>My Profile</Typography>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
                  <use xlinkHref={`${sprite}#log-out`} />
                </svg>
              </div>
              <Typography variant={'caption'}>Sign Out</Typography>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
