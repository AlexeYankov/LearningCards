import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './../../public/locales/en/enTranslation.json'
import ruTranslation from './../../public/locales/ru/ruTranslation.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
