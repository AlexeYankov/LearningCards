import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import s from './button.module.scss'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    as: Component = 'button',
    children,
    className,
    classNameBtnBox,
    fullWidth,
    icon,
    variant = 'primary',
    ...rest
  } = props

  return (
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${
        className ? className : ''
      }`}
      ref={ref}
      type={'button'}
      {...rest}
    >
      {icon && <div className={s.buttonIcon}>{icon}</div>}
      {children}
    </Component>
  )
})

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  classNameBtnBox?: string
  fullWidth?: boolean
  icon?: ReactNode
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>
