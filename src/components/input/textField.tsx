import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './textField.module.scss'

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
  return (
    <div className={s.box}>
      <label>
        <div className={`${s.label} ${disabled ? s.disabledLabel : ''}`}> {label}</div>
        <div className={s.inputContainer}>
          <Component
            className={`${s.input} ${error ? s.error : ''}`}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
        </div>
        {error ? <span className={s.errorRed}>{error}</span> : ''}
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
  type?: 'text' | 'password' | 'search'
  width?: string
  height?: string
  viewBox?: string
  IconID?: string
  label?: string
  error?: string | null
  placeholder?: string
} & ComponentPropsWithoutRef<T>
