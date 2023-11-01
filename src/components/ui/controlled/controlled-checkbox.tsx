import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

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
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <CheckBox
      SelectedIconID={SelectedIconID}
      IconID={IconID}
      checkboxId={checkboxId}
      label={name}
      {...field}
      {...checkboxProps}
    />
  )
}
