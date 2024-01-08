// import { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
//
// import { DropDown, ItemWithIcon } from '@/components/ui/dropDown'
//
// import s from './switchLang.module.scss'
//
// export enum Lang {
//   EN = 'en',
//   RU = 'ru',
// }
//
// export const SwitchLang = () => {
//   const { i18n } = useTranslation()
//
//   useEffect(() => {
//     const storedLang = localStorage.getItem('lang')
//
//     if (storedLang) {
//       i18n.changeLanguage(storedLang)
//     }
//   }, [])
//
//   const toggleLanguage = async (newLang: Lang) => {
//     i18n.changeLanguage(newLang)
//     localStorage.setItem('lang', newLang)
//   }
//
//   return (
//     <div className={s.switch}>
//       <DropDown trigger={'languagesIcon'}>
//         <ItemWithIcon onClick={() => toggleLanguage(Lang.RU)} text={'ru'} />
//         <ItemWithIcon onClick={() => toggleLanguage(Lang.EN)} text={'en'} />
//       </DropDown>
//     </div>
//   )
// }

import { PropsWithChildren, forwardRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import * as Select from '@radix-ui/react-select'
// import { SelectItem } from '@radix-ui/react-select'
import classnames from 'classnames'

import './styles.css'

const SelectItem = forwardRef(
  ({ children, className, ...props }: PropsWithChildren<any>, forwardedRef) => {
    return (
      <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)

export enum Lang {
  EN = 'en',
  RU = 'ru',
}
export const SwitchLang = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const storedLang = localStorage.getItem('lang')

    if (storedLang) {
      i18n.changeLanguage(storedLang)
    }
  }, [])

  const toggleLanguage = async (newLang: Lang) => {
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <div className={'SelectContainer'}>
      <Select.Root>
        <Select.Trigger aria-label={'Lang'} className={'SelectTrigger'}>
          <Select.Value placeholder={localStorage.getItem('lang')} />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={'SelectContent'}>
            <Select.Viewport className={'SelectViewport'}>
              <Select.Group>
                <SelectItem onClick={() => toggleLanguage(Lang.RU)} value={'ru'}>
                  ru
                </SelectItem>
                <SelectItem onClick={() => toggleLanguage(Lang.EN)} value={'en'}>
                  en
                </SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
