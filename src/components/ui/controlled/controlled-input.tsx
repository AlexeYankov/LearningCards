import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '../textField'

type ControlledInputType<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  TextFieldProps

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  password,
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
      errorMessage={error?.message}
      label={name}
      password={password}
      type={type}
      {...field}
      {...res}
    />
  )
}
