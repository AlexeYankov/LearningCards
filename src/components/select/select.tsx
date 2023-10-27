import React from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './selectRadix.module.scss'

type SelectItemProps = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  value: string
  reversed?: boolean
}

type SelectProps = {
  disabled?: boolean
  reversed?: boolean
  options: Array<string>
  placeholder?: string
  variant?: string
  label?: string
  classname?: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item className={`${s.SelectItem} ${className}`} ref={forwardedRef} {...props}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)

export const Select = ({
  reversed,
  label,
  options,
  placeholder = 'select',
  classname,
  ...rest
}: SelectProps) => {
  console.log(classname)
  return (
    <SelectRadix.Root {...rest}>
      <label htmlFor="" className={s.box}>
        <span className={`${s.label} `}>{label}</span>
        <SelectRadix.Trigger
          aria-label={`${placeholder}`}
          className={s.SelectTrigger + ' ' + `${reversed ? s.hoverActive : ''} `}
        >
          <div className={`${s.selectTriggerBox} ${classname}`}>
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon className={reversed ? s.rotate : s.SelectIcon}>
              <ChevronDownIcon />
            </SelectRadix.Icon>
          </div>
        </SelectRadix.Trigger>
      </label>
      <SelectRadix.Portal>
        <SelectRadix.Content className={`${s.SelectContent}`} position={'popper'}>
          <SelectRadix.Viewport className={s.SelectViewport}>
            <SelectRadix.Group>
              {options.map((el, i) => {
                return (
                  <SelectItem key={crypto.randomUUID()} value={el + i}>
                    {el}
                  </SelectItem>
                )
              })}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}
