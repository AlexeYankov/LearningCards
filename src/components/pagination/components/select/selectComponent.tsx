import React, { useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'

import s from './selectRadix.module.scss'

type SelectItemProps = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  value: string
  width?: string
  height?: string
  reversed?: boolean
}

type SelectProps = {
  disabled?: boolean
  reversed?: boolean
  options: Array<number>
  width?: string
  height?: string
  placeholder?: number
}

const SelectRadix = ({
  disabled,
  width,
  height,
  reversed,
  options,
  placeholder = options[options.length - 1],
}: SelectProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Select.Root disabled={disabled} onOpenChange={() => setOpen(!isOpen)} open={isOpen}>
      <Select.Trigger
        aria-label={'Food'}
        className={s.SelectTrigger}
        style={
          isOpen
            ? { borderRadius: '4px 4px 0px 0px', maxWidth: `${width}`, minWidth: `${width}` }
            : { maxWidth: `${width}`, minWidth: `${width}` }
        }
      >
        <Select.Value placeholder={placeholder}/>
        <Select.Icon className={s.SelectIcon} style={{ marginLeft: "calc(100% - 25px)" }}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.SelectContent} position={'popper'}>
          <Select.Viewport className={s.SelectViewport}>
            <Select.Group>
              {options.map(el => {
                return (
                  <SelectItem key={crypto.randomUUID()} value={`${el}`} width={width}>
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
  ({ children, width, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={s.SelectItem}
        {...props}
        ref={forwardedRef}
        // style={{ maxWidth: `${width}` }}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)

export default SelectRadix
