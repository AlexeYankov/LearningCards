import { ComponentPropsWithoutRef, ElementType } from 'react'

import sprite from '@/asserts/sprite.svg'

import s from './check-box.module.scss'

import { Label } from '../label'

export const CheckBox = <T extends ElementType = 'input'>(
  props: CheckBoxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CheckBoxProps<T>>
) => {
  const {
    IconID,
    SelectedIconID,
    as: Component = 'input',
    checkboxId,
    className,
    controlledBy,
    disabled = false,
    fullWidth,
    height = '100%',
    label,
    setControlledBy,
    theme = 'white',
    viewBox = '0 0 24 24',
    width = '100%',
    ...rest
  } = props

  return (
    <div
      className={`${s.checkboxContainer} ${className}`}
      onClick={() => (setControlledBy ? setControlledBy(!controlledBy) : '')}
      style={disabled ? { cursor: 'not-allowed', opacity: '0.7', pointerEvents: 'none' } : {}}
    >
      <div className={s.checkboxIconContainer}>
        <div className={s.checkboxUnselected}>
          <svg height={height} viewBox={viewBox} width={width}>
            <use xlinkHref={`${sprite}#${controlledBy ? SelectedIconID : IconID}`} />
          </svg>
        </div>

        <Component
          className={`${fullWidth ? s.fullWidth : ''} ${className}`}
          onChange={setControlledBy}
          style={{
            display: 'flex',
            position: 'absolute',
            width: '0px',
            zIndex: '-10',
          }}
          type={'checkbox'}
          value={controlledBy || false}
          {...rest}
        />
      </div>
      {label && <Label htmlFor={'checkboxId'} label={label} />}
    </div>
  )
}

export type CheckBoxProps<T extends ElementType = 'input'> = {
  IconID?: string
  SelectedIconID?: string
  // as?: T
  checkboxId?: string
  className?: string
  controlledBy?: boolean
  fullWidth?: boolean
  height?: string
  //   children: ReactNode
  label?: string

  setControlledBy?: (controlledBy: boolean) => void
  width?: string
} & ComponentPropsWithoutRef<T>
