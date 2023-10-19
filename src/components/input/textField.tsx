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
    ...rest
  } = props

  const [toggleType, setToggleType] = useState(type)
  const [icon, setIcon] = useState('eye-outline')

  const onClickHandler = () => {
    if (toggleType === 'password') {
      setToggleType('text')
      setIcon('eye-off-outline')
    } else {
      setToggleType(`password`)
      setIcon('eye-outline')
    }
  }
  return (
    <div className={s.box}>
      <label>
        <div className={`${s.label} ${disabled ? s.disabledLabel : ''}`}> {label}</div>
        <div className={s.inputContainer}>
          <Component
            className={`${s.input} ${error ? s.error : ''}`}
            type={type !== toggleType ? 'text' : type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {IconID && (
            <div className={s.passwordIcon} onClick={onClickHandler}>
              <svg width={width} height={height} viewBox={viewBox}>
                <use xlinkHref={`${sprite}#${icon}`} />
              </svg>
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
} & ComponentPropsWithoutRef<T>
