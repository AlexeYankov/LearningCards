import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

import profileImage from './../../asserts/profileImage.png'
import sprite from './../../asserts/sprite.svg'

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
                <span>Ivan</span>
                <span>j&johnson@gmail.com</span>
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
              <div>My Profile</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
                  <use xlinkHref={`${sprite}#log-out`} />
                </svg>
              </div>
              <div>Sign Out</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
