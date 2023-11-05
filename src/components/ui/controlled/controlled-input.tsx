import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '../textField'

type ControlledInputType<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  TextFieldProps

export const ControlledInput = <TFieldValues extends FieldValues>({
  type,
  name,
  control,
  password,
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
      type={type}
      label={name}
      errorMessage={error?.message}
      password={password}
      {...field}
      {...res}
    />
  )
}
