import { ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'

import { PasswordIcon } from '@/asserts/icons/components/PasswordIcon'
import { SearchIcon } from '@/asserts/icons/components/SearchIcon'

import s from './textField.module.scss'

export const TextField = <T extends ElementType = 'input'>(
  props: TextFieldProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextFieldProps<T>>
) => {
  const {
    onChange,
    IconEnd,
    IconID,
    IconStart,
    as: Component = 'input',
    className,
    disabled,
    error,
    height = '24px',
    label,
    placeholder,
    setValue,
    type = 'text',
    value,
    viewBox = '0 0 24 24',
    width = '24px',
    ...rest
  } = props

  const [toggleType, setToggleType] = useState(type)
  const [icon, setIcon] = useState(IconID)
  const [search, setSearch] = useState('')
  const [text, setText] = useState(value)

  const onClickHandler = () => {
    if (!disabled) {
      setToggleType(prevType => (prevType === 'password' ? 'text' : 'password'))
      setIcon(prevIcon => (prevIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline'))
    }
  }

  const clearSearch = () => {
    setSearch(search)
    setText('')
  }

  const disabledLabelClass = disabled ? s.disabledLabel : ''
  const disabledIconClass = disabled ? s.disabledIcon : ''
  const isShowErrorClass = error ? s.error : ''

  return (
    <div className={s.box}>
      <label>
        <div className={`${s.label} ${disabledLabelClass}`}> {label}</div>
        <div className={s.inputContainer}>
          <Component
            className={`${s.input} ${isShowErrorClass} ${className}`}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            type={type !== toggleType ? 'text' : type}
            value={value}
            {...rest}
          />
          {type === 'password' && IconID && (
            <PasswordIcon
              IconID={icon}
              className={`${s.passwordIcon} ${disabledIconClass}`}
              height={height}
              setToggle={onClickHandler}
              viewBox={viewBox}
              width={width}
            />
          )}
          {type === 'search' && (
            <SearchIcon
              IconEnd={IconEnd}
              IconStart={IconStart}
              className={`${s.searchIcon} ${disabledIconClass}`}
              clearSearch={clearSearch}
              height={height}
              value={text}
              viewBox={viewBox}
              width={width}
            />
          )}
        </div>
        {error && <span className={s.errorRed}>{error}</span>}
      </label>
    </div>
  )
}

export type TextFieldProps<T extends ElementType = 'input'> = {
  IconEnd?: string
  IconID?: string
  IconStart?: string
  as?: T
  children?: ReactNode
  className?: string
  error?: null | string
  height?: string
  label?: string
  placeholder?: string
  setValue?: (value: string) => void
  type: 'password' | 'search' | 'text'
  value?: string
  viewBox?: string
  width?: string
  onChange?:()=>void
} & ComponentPropsWithoutRef<T>
