import React, { useState } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'

import s from './selectRadix.module.scss'

type SelectItemProps = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  value: string
}

type SelectProps = {
  disabled?: boolean
  options: Array<number>
  placeholder?: number
}

const SelectDemo = ({
  disabled,
  options,
  placeholder = options[options.length - 1],
}: SelectProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Select.Root disabled={disabled} onOpenChange={() => setOpen(!isOpen)} open={isOpen}>
      <Select.Trigger
        aria-label={'Food'}
        className={s.SelectTrigger}
        style={isOpen ? { borderRadius: '4px 4px 0px 0px' } : {}}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={s.SelectIcon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.SelectContent} position={'popper'}>
          <Select.Viewport className={s.SelectViewport}>
            <Select.Group>
              {options.map(el => {
                return (
                  <SelectItem key={crypto.randomUUID()} value={`${el}`}>
                    {el}
                  </SelectItem>
                )
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className={s.SelectItem} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)

export default SelectDemo
