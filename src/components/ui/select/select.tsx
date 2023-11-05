import React from 'react'

import { useGetDecksQuery } from '@/api/decks/decks.api.ts'
import { changeItemsPerPage } from '@/api/decks/pagination.reducer.ts'
import { useAppDispatch, useAppSelector } from '@/api/store.ts'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './selectRadix.module.scss'

import { Label } from '../label'

type SelectItemProps = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  reversed?: boolean
  value: string
}

type SelectProps = {
  classname?: string
  disabled?: boolean
  itemsPerPage?: number
  label?: string
  onSelectChange?: (value: { itemsPerPage: number }) => void
  options: Array<string>
  placeholder?: string
  reversed?: boolean
  selectId?: string
  variant?: string
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
  classname,
  label,
  onSelectChange,
  options,
  placeholder = 'select',
  reversed,
  selectId,
  ...rest
}: SelectProps) => {
  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.pagination.itemsPerPage)

  const handleValueChange = (value: string) => {
    onSelectChange && onSelectChange({ itemsPerPage: +value })
    dispatch(changeItemsPerPage({ itemsPerPage: +value }))
  }

  useGetDecksQuery({ itemsPerPage })

  return (
    <SelectRadix.Root
      {...rest}
      defaultValue={String(itemsPerPage)}
      onValueChange={handleValueChange}
    >
      <div className={s.box}>
        <Label className={`${s.label} `} htmlFor={selectId} label={label} />
        <SelectRadix.Trigger
          aria-label={`${placeholder}`}
          className={s.SelectTrigger + ' ' + `${reversed ? s.hoverActive : ''} `}
          id={selectId}
        >
          <div className={`${s.selectTriggerBox} ${classname}`}>
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon className={reversed ? s.rotate : s.SelectIcon}>
              <ChevronDownIcon />
            </SelectRadix.Icon>
          </div>
        </SelectRadix.Trigger>
      </div>
      <SelectRadix.Portal>
        <SelectRadix.Content className={`${s.SelectContent}`} position={'popper'}>
          <SelectRadix.Viewport className={s.SelectViewport}>
            <SelectRadix.Group>
              {options.map((el, i) => (
                <SelectItem key={el + i} value={el}>
                  {el}
                </SelectItem>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}
