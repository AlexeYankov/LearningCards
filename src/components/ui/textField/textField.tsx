import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { CloseIcon, PasswordIcon, SearchIcon } from '@/asserts/icons'
import s from './textField.module.scss'
import { Label } from '@/components/ui/label'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    inputId,
    label,
    onClearClick,
    password,
    search,
    type = 'text',
    ...rest
  } = props

  const [valueType, setValueType] = useState(type)

  const disabledLabelClass = disabled ? s.disabledLabel : ''
  const disabledIconClass = disabled ? s.disabledIcon : ''
  const isShowErrorClass = errorMessage ? s.error : ''

  const handleChangeInputType = () => {
    setValueType(prevType => (prevType === 'text' ? 'password' : 'text'))
  }

  const isShowClearButton = onClearClick && search && rest.value?.length! > 0
  const passwordIcon = valueType === 'password' ? 'eye-off-outline' : 'eye-outline'
  return (
    <div className={`${s.box} ${className}`}>
      <Label className={`${s.label} ${disabledLabelClass}`} htmlFor={inputId} label={label} />
      <div className={`${s.inputContainer}`}>
        {search && (
          <div className={`${s.iconStart} ${disabledIconClass}`}>
            <SearchIcon size={20} />
          </div>
        )}
        <input
          className={`${s.input} ${isShowErrorClass}`}
          disabled={disabled}
          id={inputId}
          ref={ref}
          type={valueType}
          {...rest}
        />
        {isShowClearButton && (
          <button className={`${s.iconEnd} ${disabledIconClass}`} onClick={onClearClick}>
            <CloseIcon size={20} />
          </button>
        )}
        {password && (
          <button
            className={`${s.iconEnd} ${disabledIconClass}`}
            type={'button'}
            onClick={handleChangeInputType}
          >
            <PasswordIcon iconId={passwordIcon} size={20} />
          </button>
        )}
      </div>
      <div className={s.errorBox}>
        {errorMessage && <div className={s.showErrorRed}>{errorMessage}</div>}
      </div>
    </div>
  )
})

export type TextFieldProps = {
  errorMessage?: string
  inputId?: string
  label?: string
  onClearClick?: () => void
  password?: boolean
  search?: boolean
  type?: 'password' | 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>
