import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownPackMenu.module.scss'

import sprite from './../../asserts/sprite.svg'

export const DropDownPackMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.trigger}>info</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.content}>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
                  <use xlinkHref={`${sprite}#play-circle-outline`} />
                </svg>
              </div>
              <div>Learn</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
                  <use xlinkHref={`${sprite}#edit-2-outline`} />
                </svg>
              </div>
              <div>Edit</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={` ${s.item}`}>
            <div className={s.menuItem}>
              <div className={s.menuItemIcon}>
                <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
                  <use xlinkHref={`${sprite}#trash-outline`} />
                </svg>
              </div>
              <div>Delete</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
