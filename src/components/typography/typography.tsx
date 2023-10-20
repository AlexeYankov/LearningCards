import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './typography.module.scss'

export const Typography = <T extends ElementType = 'span'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'body', className, as: Component = 'span', children, ...rest } = props

  return (
    <Component className={`${s.typography} ${s[variant]} ${className}`} {...rest}>
      {children}
    </Component>
  )
}

export type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  children: ReactNode
  className?: string
  variant?:
    | 'large'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'body1'
    | 'subtitle1'
    | 'body2'
    | 'subtitle2'
    | 'caption'
    | 'overline'
    | 'link1'
    | 'link2'
} & ComponentPropsWithoutRef<T>
