import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef, useState } from 'react'

import { Close } from '@/asserts/icons/components/Close'
import { Password } from '@/asserts/icons/components/Password'
import { Search } from '@/asserts/icons/components/Search'

import s from './textField.module.scss'

import { Label } from '../label'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  let {
    IconID,
    as: Component = 'input',
    className,
    disabled,
    errorMessage,
    iconEnd,
    iconStart,
    inputId,
    label,
    onChange,
    onClearClick,
    password,
    placeholder,
    search,
    // setValue,
    type = 'text',
    value,
    ...rest
  } = props

  const [text, setText] = useState('')
  const [icon, setIcon] = useState(IconID)
  const [toggleType, setToggleType] = useState(type)
  const [valueType, setValueType] = useState(type)

  const disabledLabelClass = disabled ? s.disabledLabel : ''
  const disabledIconClass = disabled ? s.disabledIcon : ''
  const isShowErrorClass = errorMessage ? s.error : ''

  const handleClearText = () => {
    setText('')
  }

  const handleChangeInputType = () => {
    setValueType(prevType => (prevType === 'text' ? 'password' : 'text'))
  }

  if (search) {
    iconStart = <Search size={20} />
  }

  const onClickHandler = () => {
    if (!disabled) {
      setToggleType(prevType => (prevType === 'password' ? 'text' : 'password'))
      setIcon(prevIcon => (prevIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline'))
    }
  }

  const isShowClearButton = search && text.length <= 0
  const passwordIcon = valueType === 'password' ? 'eye-outline' : 'eye-off-outline'

  return (
    <div className={s.box}>
      <div style={{ position: 'relative' }}>
        <Label
          className={`${s.label} ${disabledLabelClass}`}
          htmlFor={inputId}
          label={label}
          style={{ position: 'absolute', top: '-25px' }}
        />
        <div className={s.inputContainer}>
          {!!iconStart && (
            <span className={`${s.iconStart} ${disabledIconClass}`}>{iconStart}</span>
          )}
          <Component
            className={`${s.input} ${isShowErrorClass} ${className}`}
            disabled={disabled}
            id={inputId}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            value={value}
            {...rest}
          />
          {!isShowClearButton && search && (
            <button className={`${s.iconEnd} ${disabledIconClass}`} onClick={handleClearText}>
              <Close size={20} />
            </button>
          )}
          {password && (
            <button className={`${s.iconEnd} ${disabledIconClass}`} onClick={handleChangeInputType}>
              <Password iconId={passwordIcon} size={20} />
            </button>
          )}
        </div>
        {errorMessage && <span className={s.errorRed}>{errorMessage}</span>}
      </div>
    </div>
  )
})

export type TextFieldProps<T extends ElementType = 'input'> = {
  IconID?: string
  as?: T
  children?: ReactNode
  className?: string
  error?: string
  errorMessage?: null | string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  inputId?: string
  label?: string
  onChange?: (value: string) => void
  onClearClick?: () => void
  password?: boolean
  placeholder?: string
  search?: boolean
  type?: 'password' | 'text'
  value?: string
} & ComponentPropsWithoutRef<T>
