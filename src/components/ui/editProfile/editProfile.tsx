import { useState } from 'react'

import profileImage from '@/asserts/profileImage.png'

import s from './editProfile.module.scss'

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
      <div className={s.cardsContainer}>
        <div className={s.cards}>
          <h1 className={s.text}>Personal information</h1>
          <img alt={''} className={s.logoProfileEdit} src={profileImage} />
          <EditableSpan onChange={handleValueChange} value={value} />
        </div>
      </div>
    </div>
  )
}
