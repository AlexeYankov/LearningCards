import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FlagEnIcon } from '@/asserts/icons/components/FlagEnIcon'
import { FlagRuIcon } from '@/asserts/icons/components/FlagRuIcon'
import { Button } from '@/components/ui/button'

import s from './switchLang.module.scss'

export enum Lang {
  EN = 'en',
  RU = 'ru',
}

export const SwitchLang = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState<Lang>(Lang.EN)

  useEffect(() => {
    const storedLang = localStorage.getItem('lang')

    if (storedLang) {
      setCurrentLang(storedLang as Lang)
      i18n.changeLanguage(storedLang)
    }
  }, [])

  const toggleLanguage = async () => {
    const newLang = currentLang === Lang.EN ? Lang.RU : Lang.EN

    setCurrentLang(newLang)
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <Button className={s.buttonContainer} onClick={toggleLanguage} variant={'link'}>
      {(currentLang === Lang.RU && <FlagRuIcon />) || <FlagEnIcon />}
      {currentLang}
    </Button>
  )
}
