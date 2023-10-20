import { ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'
import s from './textField.module.scss'
import { PasswordIcon } from '@/asserts/icons/components/PasswordIcon.tsx'
import { SearchIcon } from '@/asserts/icons/components/SearchIcon.tsx'

export const TextField = <T extends ElementType = 'input'>(
  props: TextFieldProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextFieldProps<T>>
) => {
  const {
    value,
    setValue,
    as: Component = 'input',
    type = 'text',
    className,
    viewBox = '0 0 24 24',
    width = '24px',
    height = '24px',
    IconID,
    label,
    error,
    placeholder,
    disabled,
    IconStart,
    IconEnd,
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
  const isShowIconDisabled = disabled ? s.disabledIcon : ''

  return (
    <div className={s.box}>
      <label>
        <div className={`${s.label} ${disabledLabelClass}`}> {label}</div>
        <div className={s.inputContainer}>
          <Component
            className={`${s.input} ${isShowErrorClass}`}
            type={type !== toggleType ? 'text' : type}
            value={text}
            onChange={e => setText(e.currentTarget.value)}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {type === 'password' && IconID && (
            <PasswordIcon
              className={`${s.passwordIcon} ${isShowIconDisabled}`}
              width={width}
              height={height}
              viewBox={viewBox}
              IconID={icon}
              setToggle={onClickHandler}
            />
          )}
          {type === 'search' && (
            <SearchIcon
              className={`${s.searchIcon} ${disabledIconClass}`}
              clearSearch={clearSearch}
              IconStart={IconStart}
              IconEnd={IconEnd}
              value={text}
              width={width}
              height={height}
              viewBox={viewBox}
            />
          )}
        </div>
        {error && <span className={s.errorRed}>{error}</span>}
      </label>
    </div>
  )
}

type TextFieldProps<T extends ElementType = 'input'> = {
  value?: string
  setValue?: (value: string) => void
  as?: T
  children?: ReactNode
  className?: string
  type: 'text' | 'password' | 'search'
  width?: string
  height?: string
  viewBox?: string
  IconID?: string
  label?: string
  error?: string | null
  placeholder?: string
  IconStart?: string
  IconEnd?: string
} & ComponentPropsWithoutRef<T>
