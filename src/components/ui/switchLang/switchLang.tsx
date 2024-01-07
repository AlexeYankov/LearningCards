import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { DropDown, ItemWithIcon } from '@/components/ui/dropDown'

import s from './switchLang.module.scss'

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
    <div className={s.switch}>
      <DropDown trigger={'languagesIcon'}>
        <ItemWithIcon onClick={() => toggleLanguage(Lang.RU)} text={'ru'} />
        <ItemWithIcon onClick={() => toggleLanguage(Lang.EN)} text={'en'} />
      </DropDown>
    </div>
  )
}
