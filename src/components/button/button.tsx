import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from 'react'

import sprite from '@/asserts/sprite.svg'

import s from './button.module.scss'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    IconID,
    as: Component = 'button',
    children,
    className,
    fullWidth,
    height = '24px',
    variant = 'primary',
    viewBox = '0 0 24 24',
    width = '24px',
    classNameBtnBox,
    ...rest
  } = props

  return (
    <div className={`${s.box} ${classNameBtnBox}`}>
      <Component
        className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        ref={ref}
        {...rest}
      >
        {IconID && (
          <div className={s.buttonIcon}>
            <svg height={height} viewBox={viewBox} width={width}>
              <use xlinkHref={`${sprite}#${IconID}`} />
            </svg>
          </div>
        )}
        {children}
      </Component>
    </div>
  )
})

export type ButtonProps<T extends ElementType = 'button'> = {
  IconID?: string
  as?: T
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  height?: string
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
  viewBox?: string
  width?: string
  classNameBtnBox?: string
} & ComponentPropsWithoutRef<T>
