import { ComponentPropsWithoutRef, ElementType } from 'react'

import sprite from '@/asserts/sprite.svg'

import s from './check-box.module.scss'

import { Label } from '../label'

type Props<T extends ElementType = 'input'> = {
  IconID?: string
  SelectedIconID?: string
  checkboxId?: string
  className?: string
  fullWidth?: boolean
  height?: string
  label?: string
  width?: string
} & ComponentPropsWithoutRef<T>

export const CheckBox = <T extends ElementType = 'input'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const {
    IconID,
    SelectedIconID,
    as: Component = 'input',
    checkboxId,
    checked,
    className,
    disabled = false,
    fullWidth,
    height = '100%',
    label,
    onChange,
    theme = 'white',
    viewBox = '0 0 24 24',
    width = '100%',
    ...rest
  } = props

  return (
    <div
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
