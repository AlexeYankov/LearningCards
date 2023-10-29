import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from 'react'

import s from './button.module.scss'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    icon,
    as: Component = 'button',
    children,
    className,
    fullWidth,
    variant = 'primary',
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
        {icon && <div className={s.buttonIcon}>{icon}</div>}
        {children}
      </Component>
    </div>
  )
})

export type ButtonProps<T extends ElementType = 'button'> = {
  icon?: ReactNode
  as?: T
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
  classNameBtnBox?: string
} & ComponentPropsWithoutRef<T>
