import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '../textField'

type ControlledInputType<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  TextFieldProps

export const ControlledInput = <TFieldValues extends FieldValues>({
  IconID,
  control,
  name,
  type,
  ...res
}: ControlledInputType<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <TextField
      error={error?.message}
      label={name}
      type={type}
      {...field}
      {...res}
      IconID={IconID}
    />
  )
}
