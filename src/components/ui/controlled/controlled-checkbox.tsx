import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox, CheckBoxProps } from '../checkbox/check-box.tsx'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & CheckBoxProps

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  IconID,
  SelectedIconID,
  checkboxId,
  control,
  defaultValue,
  label,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CheckBox
      IconID={IconID}
      SelectedIconID={SelectedIconID}
      checkboxId={checkboxId}
      checked={value}
      label={label}
      name={name}
      onChange={onChange}
      {...checkboxProps}
    />
  )
}
