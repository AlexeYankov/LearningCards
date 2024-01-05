import React, { useState } from 'react'

import { changeCardsCurrentPage, changeCardsItemsPerPage, selectedOptionSlice } from '@/api/cards'
import { changeCurrentPage, changeItemsPerPage } from '@/api/decks'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './selectRadix.module.scss'

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
  isAddEditCard?: boolean
  itemsPerPage?: number
  label?: string
  options: Array<string>
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

const SelectContent = ({ options }: { options: string[] }) => {
  return (
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
  )
}

export const Select = ({
  classname,
  isAddEditCard,
  label,
  options,
  reversed,
  selectId,
  ...rest
}: SelectProps) => {
  const dispatch = useAppDispatch()

  const valueSelect = useAppSelector(state => state.cards.valueSelect)
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const [selectedValue, setSelectedValue] = useState(valueSelect)

  const handleValueChange = (value: string) => {
    if (options.includes(value)) {
      if (isAddEditCard) {
        setSelectedValue(value)
        dispatch(selectedOptionSlice({ valueSelect: value }))
      }
      dispatch(changeCurrentPage({ currentPage: 1 }))
      dispatch(changeCardsCurrentPage({ currentPage: 1 }))
      if (value !== 'Picture' && value !== 'Text') {
        dispatch(changeItemsPerPage({ itemsPerPage: +value }))
        dispatch(changeCardsItemsPerPage({ itemsPerPage: +value }))
      }
    }
  }

  return (
    <SelectRadix.Root onValueChange={handleValueChange} value={itemsPerPage.toString()} {...rest}>
      <div className={s.box}>
        <SelectRadix.Trigger
          className={s.SelectTrigger + ' ' + `${reversed ? s.hoverActive : ''} `}
          disabled={options.length === 0}
          id={selectId}
        >
          <div className={`${s.selectTriggerBox} ${classname}`}>
            <SelectRadix.Value>{isAddEditCard ? selectedValue : itemsPerPage}</SelectRadix.Value>
            <SelectRadix.Icon className={reversed ? s.rotate : s.SelectIcon}>
              <ChevronDownIcon />
            </SelectRadix.Icon>
          </div>
        </SelectRadix.Trigger>
      </div>
      <SelectRadix.Portal>
        <SelectContent options={options} />
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}
