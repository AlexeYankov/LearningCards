import React from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './selectRadix.module.scss'

type SelectItemProps = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  value: string
  width?: string
  height?: string
  padding?: string
  reversed?: boolean
}

type SelectProps = {
  disabled?: boolean
  reversed?: boolean
  options: Array<string>
  width?: string
  height?: string
  padding?: string
  placeholder?: string
  variant?: string
  label?: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, width, padding, className, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item
        className={s.SelectItem}
        ref={forwardedRef}
        style={{ padding: `0px ${padding}` }}
        {...props}
      >
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)

export const Select = ({
  width,
  height,
  padding,
  reversed,
  label,
  options,
  placeholder = 'select',
  ...rest
}: SelectProps) => {
  return (
    <SelectRadix.Root {...rest}>
      <SelectRadix.Trigger
        aria-label={`${placeholder}`}
        className={s.SelectTrigger + ' ' + `${reversed ? s.hoverActive : ''}`}
        style={{
          maxWidth: `calc(${width} - ${padding}*2)`,
          minWidth: `calc(${width} - ${padding}*2)`,
          width: `${width}`,
          padding: `0px ${padding}`,
        }}
      >
        <SelectRadix.Value placeholder={placeholder} />
        <SelectRadix.Icon className={reversed ? s.rotate : s.SelectIcon}>
          <ChevronDownIcon />
        </SelectRadix.Icon>
        <label htmlFor="" className={s.selectLabelforSelect}>
          {label}
        </label>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content className={s.SelectContent} position={'popper'}>
          <SelectRadix.Viewport className={s.SelectViewport}>
            <SelectRadix.Group>
              {options.map((el, i) => {
                return (
                  <SelectItem key={crypto.randomUUID()} value={el + i} padding={padding}>
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
