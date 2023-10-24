import s from './dropDownPackMenu.module.scss'

import { DropDownWrapper } from '@/components/dropDownWrapper'
import { DropDownItemWithIcon } from '@/components/dropDownItemWithIcon'
import { Learn } from '@/asserts/icons/components/Learn.tsx'
import { Edit } from '@/asserts/icons/components/Edit.tsx'
import { Delete } from '@/asserts/icons/components/Delete.tsx'

export const DropDownPackMenu = () => {
  return (
    <DropDownWrapper className={s.content} trigger>
      <DropDownItemWithIcon icon={<Learn />} text="Learn" />
      <DropDownItemWithIcon icon={<Edit />} text="Edit" />
      <DropDownItemWithIcon icon={<Delete />} text="Delete" />
    </DropDownWrapper>
  )
}
