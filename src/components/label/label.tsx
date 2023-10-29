import * as LabelRadix from '@radix-ui/react-label'
import { ComponentPropsWithoutRef, FC } from 'react'

import s from './label.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<'label'>

export const Label: FC<Props> = ({ label, className, ...rest }) => (
  <LabelRadix.Root className={`${s.label} ${className}`} {...rest}>
    {label}
  </LabelRadix.Root>
)
