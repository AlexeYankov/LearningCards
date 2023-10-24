import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownPackMenu.module.scss'

import sprite from '@/asserts/sprite.svg'
import { Typography } from '@/components/typography'
import { DropDownWrapper } from '@/components/dropDownWrapper'

export const DropDownPackMenu = () => {
  return (
    <DropDownWrapper className={s.content} trigger>
      <DropdownMenu.Item className={` ${s.item}`}>
        <div className={s.menuItem}>
          <div className={s.menuItemIcon}>
            <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
              <use xlinkHref={`${sprite}#play-circle-outline`} />
            </svg>
          </div>
          <Typography variant={'caption'}>Learn</Typography>
        </div>
      </DropdownMenu.Item>
      <DropdownMenu.Item className={` ${s.item}`}>
        <div className={s.menuItem}>
          <div className={s.menuItemIcon}>
            <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
              <use xlinkHref={`${sprite}#edit-2-outline`} />
            </svg>
          </div>
          <Typography variant={'caption'}>Edit</Typography>
        </div>
      </DropdownMenu.Item>
      <DropdownMenu.Item className={` ${s.item}`}>
        <div className={s.menuItem}>
          <div className={s.menuItemIcon}>
            <svg fill={'none'} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'}>
              <use xlinkHref={`${sprite}#trash-outline`} />
            </svg>
          </div>
          <Typography variant={'caption'}>Delete</Typography>
        </div>
      </DropdownMenu.Item>
    </DropDownWrapper>
  )
}
