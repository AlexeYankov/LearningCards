import React, { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import s from './selectRadix.module.scss'

type SelectItemProps = {
  children?: React.ReactNode
  className?: string
  value: string
  disabled?: boolean
}

type SelectProps = {
  options: Array<number>
  placeholder?: number
  disabled?: boolean
}

const SelectDemo = ({ options, placeholder = options[options.length - 1], disabled}: SelectProps) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Select.Root open={isOpen} onOpenChange={() => setOpen(!isOpen)} disabled={disabled}>
      <Select.Trigger className={s.SelectTrigger} style={isOpen ? {borderRadius: '4px 4px 0px 0px'} : {}} aria-label="Food">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={s.SelectIcon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={s.SelectContent}
          position="popper"
        >
          <Select.Viewport className={s.SelectViewport}>
            <Select.Group>
              {options.map(el => {
                return (
                  <SelectItem value={`${el}`} key={crypto.randomUUID()}>
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
