import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox, CheckBoxProps } from '../checkbox/check-box.tsx'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<CheckBoxProps, 'id' | 'onChange' | 'value'>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  IconID,
  SelectedIconID,
  control,
  defaultValue,
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
      {...{
        controlledBy: value,
        setControlledBy: onChange,
        ...checkboxProps,
        IconID,
        SelectedIconID,
      }}
    />
  )
}
