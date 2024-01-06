import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import s from './typography.module.scss'

export const Typography = forwardRef<HTMLSpanElement, TypographyProps>((props, ref) => {
  const { as: Component = 'span', children, className, variant = 'large', ...rest } = props

  return (
    <Component className={`${s.typography} ${s[variant]} ${className}`} ref={ref} {...rest}>
      {children}
    </Component>
  )
})
export type TypographyProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  variant?: VariantType
} & ComponentPropsWithoutRef<T>

export type VariantType =
  | 'body1'
  | 'body2'
  | 'caption'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'large'
  | 'link1'
  | 'link2'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
