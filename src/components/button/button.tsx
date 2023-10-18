import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'
import sprite from '@/asserts/sprite.svg'

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    children,
    viewBox = '0 0 24 24',
    width = '24px',
    height = '24px',
    IconID,
    ...rest
  } = props

  return (
    <>
      <Component
        className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        {...rest}
      >
        {IconID && (
          <div className={s.buttonIcon}>
            <svg width={width} height={height} viewBox={viewBox}>
              <use xlinkHref={`${sprite}#${IconID}`} />
            </svg>
          </div>
        )}
        {children}
      </Component>
    </>
  )
}

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
  width?: string
  height?: string
  viewBox?: string
  IconID?: string
} & ComponentPropsWithoutRef<T>
