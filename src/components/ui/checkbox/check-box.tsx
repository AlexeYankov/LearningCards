import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './check-box.module.scss'

import sprite from '@/asserts/sprite.svg'
import { Label } from '../label'

export const CheckBox = <T extends ElementType = 'input'>(
  props: CheckBoxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CheckBoxProps<T>>
) => {
  const {
    IconID,
    SelectedIconID,
    as: Component = 'input',
    className,
    disabled = false,
    fullWidth,
    height = '100%',
    label,
    theme = 'white',
    viewBox = '0 0 24 24',
    width = '100%',
    checkboxId,
    onChange,
    checked,
    ...rest
  } = props

  return (
    <div
      // className={`${s.checkboxContainer}`}
      className={`${s.checkboxContainer} ${className}`}
      onClick={() => (onChange ? onChange(!checked) : '')}
      style={disabled ? { cursor: 'not-allowed', opacity: '0.7', pointerEvents: 'none' } : {}}
    >
      <div className={s.checkboxIconContainer}>
        <div className={s.checkboxUnselected}>
          <svg height={height} viewBox={viewBox} width={width}>
            <use xlinkHref={`${sprite}#${checked ? SelectedIconID : IconID}`} />
          </svg>
        </div>

        <Component
          // className={`${fullWidth ? s.fullWidth : ''}`}
          className={`${fullWidth ? s.fullWidth : ''} ${className}`}
          style={{
            display: 'flex',
            position: 'absolute',
            width: '0px',
            zIndex: '-10',
          }}
          type={'checkbox'}
          {...rest}
        />
      </div>
      {label && <Label htmlFor={'checkboxId'} label={label} />}
    </div>
  )
}

export type CheckBoxProps<T extends ElementType = 'input'> = {
  checkboxId?: string
  IconID?: string
  SelectedIconID?: string
  className?: string
  fullWidth?: boolean
  height?: string
  label?: string
  width?: string
  // checked?: boolean
  // onChange?: (isCheck: boolean) => void
} & ComponentPropsWithoutRef<T>
