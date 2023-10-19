import { ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'
import s from './textField.module.scss'
import sprite from '@/asserts/sprite.svg'

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
  const [search, setSearch] = useState()
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
            className={`${s.input} ${isShowErrorClass}`}
            type={type !== toggleType ? 'text' : type}
            value={text}
            onChange={e => {
              setText(e.currentTarget.value)
            }}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {type === 'password' && IconID && (
            <div className={`${s.passwordIcon} ${disabledIconClass}`} onClick={onClickHandler}>
              <svg width={width} height={height} viewBox={viewBox}>
                <use xlinkHref={`${sprite}#${icon}`} />
              </svg>
            </div>
          )}
          {type === 'search' && (
            <div className={`${s.searchIcon} ${disabledIconClass}`}>
              <svg width={width} height={height} viewBox={viewBox}>
                <use xlinkHref={`${sprite}#${IconStart}`} />
              </svg>
              {!!text && (
                <svg width={width} height={height} viewBox={viewBox} onClick={clearSearch}>
                  <use xlinkHref={`${sprite}#${IconEnd}`} />
                </svg>
              )}
            </div>
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
