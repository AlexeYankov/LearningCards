import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox, CheckBoxProps } from '../checkbox/check-box.tsx'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & CheckBoxProps

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  IconID,
  SelectedIconID,
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  checkboxId,
  label,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const { field:{value,onChange} } = useController({
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CheckBox
      SelectedIconID={SelectedIconID}
      IconID={IconID}
      checkboxId={checkboxId}
      label={name}
      name={name}
      onChange={onChange}
      checked={value}
      {...checkboxProps}
    />
  )
}
