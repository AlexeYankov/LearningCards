import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './dropDownMenu.module.scss'
import sprite from './../../asserts/sprite.svg'
import profileImage from './../../asserts/profileImage.png'

export const DropDownMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.trigger}>
        <img className={s.triggerImg} src={profileImage} alt="" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.content} sideOffset={5}>
          <DropdownMenu.Item className={`${s.item} `}>
            <div className={s.inner}>
              <img className={s.img} src={profileImage} alt="" />
              <div className={s.itemBox}>
                <span>Ivan</span>
                <span>j&johnson@gmail.com</span>
              </div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref={`${sprite}#person-outline`} />
                </svg>
              </div>
              <div>My Profile</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref={`${sprite}#log-out`} />
                </svg>
              </div>
              <div>Sign Out</div>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
