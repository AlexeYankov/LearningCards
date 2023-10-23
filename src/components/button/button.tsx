import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import sprite from '@/asserts/sprite.svg'

import s from './button.module.scss'

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
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
            <svg height={height} viewBox={viewBox} width={width}>
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
  IconID?: string
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  height?: string
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
  viewBox?: string
  width?: string
} & ComponentPropsWithoutRef<T>
