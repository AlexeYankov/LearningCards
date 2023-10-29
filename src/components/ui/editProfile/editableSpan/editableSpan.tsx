import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textField'

import s from '../editProfile.module.scss'

type EditableSpanPropsType = {
  onChange: (newValue: string) => void
  value: string
}

export const EditableSpan = React.memo(function ({ onChange, value }: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }

  const activateViewMode = () => {
    setEditMode(false)
    onChange(title) // Сохраняем текущее значение title
  }

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false)
      onChange(title)
    } else if (e.key === 'Escape') {
      setEditMode(false)
      setTitle(value)
    }
  }

  return editMode ? (
    <span>
      <TextField
        autoFocus
        label={'Nickname'}
        onKeyPress={keyPress}
        // onChange={onChage}
        type={'text'}
        value={title}
      />
      <Button
        children={'Save Changes'}
        className={s.textField}
        fullWidth
        onClick={activateViewMode}
        variant={'primary'}
      />
    </span>
  ) : (
    <>
      <h1 className={s.text} onDoubleClick={activateEditMode}>
        {value}
      </h1>
      <div className={s.email}>j&johnson@gmail.com</div>
      {/* <Button IconID={'log-out'} children={'Log out'} variant={'secondary'} /> */}
    </>
  )
})
