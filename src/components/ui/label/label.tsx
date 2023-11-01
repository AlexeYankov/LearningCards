import { ComponentPropsWithoutRef, FC } from 'react'

import * as LabelRadix from '@radix-ui/react-label'

import s from './label.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<'label'>

export const Label: FC<Props> = ({ className, label, ...rest }) => (
  <LabelRadix.Root className={`${s.label} ${className}`} {...rest}>
    {label}
  </LabelRadix.Root>
)