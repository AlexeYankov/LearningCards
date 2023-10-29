import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
  useState,
} from 'react'

import { Close } from '@/asserts/icons/components/Close'
import { Password } from '@/asserts/icons/components/Password'
import { Search } from '@/asserts/icons/components/Search'
import { Label } from '@/components/label'

import s from './textField.module.scss'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  let {
    as: Component = 'input',
    className,
    disabled,
    errorMessage,
    iconEnd,
    iconStart,
    inputId,
    label,
    onClearClick,
    password,
    placeholder,
    search,
    setValue,
    type = 'text',
    value,
    ...rest
  } = props

  const [text, setText] = useState('')
  const [valueType, setValueType] = useState(type)

  const disabledLabelClass = disabled ? s.disabledLabel : ''
  const disabledIconClass = disabled ? s.disabledIcon : ''
  const isShowErrorClass = errorMessage ? s.error : ''

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleClearText = () => {
    setText('')
  }

  const handleChangeInputType = () => {
    setValueType(prevType => (prevType === 'text' ? 'password' : 'text'))
  }

  if (search) {
    iconStart = <Search size={20} />
  }

  const isShowClearButton = search && text.length <= 0
  const passwordIcon = valueType === 'password' ? 'eye-outline' : 'eye-off-outline'

  return (
    <div className={s.box}>
      <div>
        <Label className={`${s.label} ${disabledLabelClass}`} htmlFor={inputId} label={label} />
        <div className={s.inputContainer}>
          {!!iconStart && (
            <span className={`${s.iconStart} ${disabledIconClass}`}>{iconStart}</span>
          )}
          <Component
            className={`${s.input} ${isShowErrorClass}`}
            disabled={disabled}
            id={inputId}
            onChange={handleChangeText}
            placeholder={placeholder}
            ref={ref}
            type={valueType}
            value={text}
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
          {password && (
            <button
              className={`${s.iconEnd} ${disabledIconClass}`}
              onClick={handleChangeInputType}
              type={'button'}
            >
              <Password iconId={passwordIcon} size={20} />
            </button>
          )}
        </div>
        {errorMessage && <span className={s.errorRed}>{errorMessage}</span>}
      </div>
    </div>
  )
})

type TextFieldProps<T extends ElementType = 'input'> = {
  as?: T
  children?: ReactNode
  className?: string
  errorMessage?: null | string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  inputId?: string
  label?: string
  onClearClick?: () => void
  password?: boolean
  placeholder?: string
  search?: boolean
  setValue?: (value: string) => void
  type?: 'password' | 'text'
  value?: string
} & ComponentPropsWithoutRef<T>
