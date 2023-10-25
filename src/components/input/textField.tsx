import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ReactNode,
  useState,
} from 'react'

import s from './textField.module.scss'
import { Search } from '@/asserts/icons/components/Search'
import { Close } from '@/asserts/icons/components/Close'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  let {
    as: Component = 'input',
    className,
    iconEnd,
    iconStart,
    disabled,
    errorMessage,
    label,
    placeholder,
    setValue,
    type = 'text',
    search,
    password,
    value,
    onClearClick,
    ...rest
  } = props

  const [text, setText] = useState('')

  const disabledLabelClass = disabled ? s.disabledLabel : ''
  const disabledIconClass = disabled ? s.disabledIcon : ''
  const isShowErrorClass = errorMessage ? s.error : ''

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleClearText = () => {
    setText('')
  }

  if (search) {
    iconStart = <Search size={20} />
  }

  const isShowClearButton = text.length <= 0

  return (
    <div className={s.box}>
      <label>
        <div className={`${s.label} ${disabledLabelClass}`}> {label}</div>
        <div className={s.inputContainer}>
          {!!iconStart && (
            <span className={`${s.iconStart} ${disabledIconClass}`}>{iconStart}</span>
          )}
          <Component
            className={`${s.input} ${isShowErrorClass}`}
            disabled={disabled}
            onChange={handleChangeText}
            placeholder={placeholder}
            type={type}
            value={text}
            ref={ref}
            {...rest}
          />
          {!isShowClearButton && search && (
            <button
              className={`${s.iconEnd} ${disabledIconClass}`}
              onClick={handleClearText}
              type={'button'}
            >
              <Close size={20} />
            </button>
          )}
          {/*{type === 'password' && (*/}
          {/*  <Component*/}
          {/*    className={`${s.passwordIcon} ${disabledIconClass}`}*/}
          {/*    type={'password'}*/}
          {/*    icon={<Password />}*/}
          {/*    onChange={() => {}}*/}
          {/*    disabled={disabled}*/}
          {/*    value={text}*/}
          {/*    ref={ref}*/}
          {/*    placeholder={placeholder}*/}
          {/*    {...rest}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
        {errorMessage && <span className={s.errorRed}>{errorMessage}</span>}
      </label>
    </div>
  )
})

type TextFieldProps<T extends ElementType = 'input'> = {
  as?: T
  children?: ReactNode
  className?: string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  errorMessage?: null | string
  label?: string
  placeholder?: string
  setValue?: (value: string) => void
  type?: 'password' | 'text'
  value?: string
  search?: boolean
  password?: boolean
  onClearClick?: () => void
} & ComponentPropsWithoutRef<T>
