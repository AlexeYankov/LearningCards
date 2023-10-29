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
import { Password } from '@/asserts/icons/components/Password'
import { Label } from '@/components/label'

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
    inputId,
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
        <Label label={label} htmlFor={inputId} className={`${s.label} ${disabledLabelClass}`} />
        <div className={s.inputContainer}>
          {!!iconStart && (
            <span className={`${s.iconStart} ${disabledIconClass}`}>{iconStart}</span>
          )}
          <Component
            className={`${s.input} ${isShowErrorClass}`}
            disabled={disabled}
            onChange={handleChangeText}
            placeholder={placeholder}
            type={valueType}
            value={text}
            id={inputId}
            ref={ref}
            {...rest}
          />
          {!isShowClearButton && search && (
            <button
              className={`${s.iconEnd} ${disabledIconClass}`}
              onClick={handleClearText}
              type="button"
            >
              <Close size={20} />
            </button>
          )}
          {password && (
            <button
              className={`${s.iconEnd} ${disabledIconClass}`}
              onClick={handleChangeInputType}
              type="button"
            >
              <Password size={20} iconId={passwordIcon} />
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
  inputId?: string
} & ComponentPropsWithoutRef<T>
