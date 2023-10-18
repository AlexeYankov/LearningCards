import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import s from './check-box.module.scss'

import sprite from '../../asserts/sprite.svg'

export const CheckBox = <T extends ElementType = 'input'>(
  props: CheckBoxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CheckBoxProps<T>>
) => {
  const {
    setControlledBy,
    controlledBy,
    label,
    IconID,
    theme = 'white',
    SelectedIconID,
    fullWidth,
    disabled = false,
    width = '100%',
    height = '100%',
    viewBox = '0 0 24 24',
    className,
    as: Component = 'input',
    ...rest
  } = props
  const [isChecked, setChecked] = useState(controlledBy)
  return (
    <div
      className={s.checkboxContainer}
      onClick={() => setChecked(!isChecked)}
      style={disabled ? { opacity: '0.7', cursor: 'not-allowed', pointerEvents: 'none' } : {}}
    >
      <div className={s.checkboxIconContainer}>
        <div className={s.checkboxUnselected}>
          <svg width={width} height={height} viewBox={viewBox}>
            <use xlinkHref={`${sprite}#${isChecked ? SelectedIconID : IconID}`} />
          </svg>
        </div>

        <Component
          className={`${fullWidth ? s.fullWidth : ''} ${className}`}
          type={'checkbox'}
          value={controlledBy || false}
          onChange={setControlledBy}
          style={{
            display: 'flex',
            position: 'absolute',
            zIndex: '-10',
            width: '0px',
          }}
          {...rest}
        />
      </div>
      {label && <label>{label}</label>}
    </div>
  )
}

export type CheckBoxProps<T extends ElementType = 'input'> = {
  //   as?: T
  //   children: ReactNode
  label?: string
  fullWidth?: boolean
  className?: string
  IconID?: string
  SelectedIconID?: string
  height?: string
  width?: string

  controlledBy?: boolean
  setControlledBy?: (value: boolean) => void
} & ComponentPropsWithoutRef<T>
