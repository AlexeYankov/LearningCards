import { useState } from 'react'

import profileImage from '@/asserts/profileImage.png'

import s from './editProfile.module.scss'

import logo from '../../../asserts/Logo.png'
import { EditableSpan } from './editableSpan/editableSpan'

type Props = {
  name: string
}
export const EditProfile = ({ name = 'Ivan' }: Props) => {
  const [value, setValue] = useState(name)
  const handleValueChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <img alt={''} className={s.logo} src={logo} />
        <div className={s.textHeader}>
          {value} <img alt={''} className={s.logoProfile} src={profileImage} />
        </div>
      </header>
      <div className={s.cardsContainer}>
        <div className={s.cards}>
          <h1 className={s.text}>Personal information</h1>
          <img alt={''} className={s.logoProfileEdit} src={profileImage} />
          <EditableSpan onChange={handleValueChange} value={value} />

          {/*  Ivan <img alt={''} src={icon} />*/}
        </div>
      </div>
    </div>
  )
}
