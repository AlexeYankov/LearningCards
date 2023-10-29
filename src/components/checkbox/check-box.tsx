import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Label } from '@/components/label'
import {ComponentPropsWithoutRef, ElementType} from 'react'

import s from './check-box.module.scss'

import sprite from '../../asserts/sprite.svg'

export const CheckBox = <T extends ElementType = 'input'>(
    props: CheckBoxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CheckBoxProps<T>>
) => {
  const {
    IconID,
    SelectedIconID,
    as: Component = 'input',
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
  const [isChecked, setChecked] = useState(controlledBy)

    return (
        <div
            className={`${s.checkboxContainer} ${className}`}
            onClick={() => setControlledBy ? setControlledBy(!controlledBy) :''}
            style={disabled ? {cursor: 'not-allowed', opacity: '0.7', pointerEvents: 'none'} : {}}
        >
            <div className={s.checkboxIconContainer}>
                <div className={s.checkboxUnselected}>
                    <svg height={height} viewBox={viewBox} width={width}>
                        <use xlinkHref={`${sprite}#${controlledBy ? SelectedIconID : IconID}`}/>
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
      {label && <label>{label}</label>}
    </div>
  )
}

export type CheckBoxProps<T extends ElementType = 'input'> = {
  //   as?: T
  IconID?: string
  SelectedIconID?: string
  className?: string
  controlledBy?: boolean
  fullWidth?: boolean
  height?: string
  //   children: ReactNode
  label?: string

  setControlledBy?: (value: boolean) => void
  width?: string
} & ComponentPropsWithoutRef<T>
