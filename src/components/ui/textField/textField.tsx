import { ComponentPropsWithoutRef, forwardRef, KeyboardEvent, ReactNode, useState } from 'react'

import { Close } from '@/asserts/icons/components/Close'
import { Password } from '@/asserts/icons/components/Password'
import { Search } from '@/asserts/icons/components/Search'

import s from './textField.module.scss'
import { Label } from '../label'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  let {
    className,
    disabled,
    errorMessage,
    inputId,
    label,
    onClearClick,
    onEnter,
    password,
    placeholder,
    search,
    type = 'text',
    onKeyDown,
    ...rest
  } = props

  const [valueType, setValueType] = useState(type)

  const disabledLabelClass = disabled ? s.disabledLabel : ''
  const disabledIconClass = disabled ? s.disabledIcon : ''
  const isShowErrorClass = errorMessage ? s.error : ''

  const handleChangeInputType = () => {
    setValueType(prevType => (prevType === 'text' ? 'password' : 'text'))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e)
    }
    onKeyDown?.(e)
  }

  const isShowClearButton = onClearClick && search && rest.value?.length! > 0
  const passwordIcon = valueType === 'password' ? 'eye-outline' : 'eye-off-outline'

  return (
    <div className={s.box}>
      <div>
        <Label className={`${s.label} ${disabledLabelClass}`} htmlFor={inputId} label={label} />
        <div className={s.inputContainer}>
          {search && (
            <div className={`${s.iconStart} ${disabledIconClass}`}>
              <Search size={20} />
            </div>
          )}
          <input
            className={`${s.input} ${isShowErrorClass} ${className}`}
            disabled={disabled}
            id={inputId}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={ref}
            type={valueType}
            {...rest}
          />
          {isShowClearButton && (
            <button className={`${s.iconEnd} ${disabledIconClass}`} onClick={onClearClick}>
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

export type TextFieldProps = {
  children?: ReactNode
  className?: string
  errorMessage?: null | string
  inputId?: string
  label?: string
  onClearClick?: () => void
  password?: boolean
  placeholder?: string
  search?: boolean
  type?: 'password' | 'text'
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  value?: string
} & ComponentPropsWithoutRef<'input'>
