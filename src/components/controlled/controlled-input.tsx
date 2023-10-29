import {
    FieldValues,
    useController,
    UseControllerProps,
} from "react-hook-form";

import {TextField, TextFieldProps} from "@/components/input/textField.tsx";

type ControlledInputType<TFieldValues extends FieldValues> =
    UseControllerProps<TFieldValues> & TextFieldProps;

export const ControlledInput = <TFieldValues extends FieldValues>({
                                                                      type,
                                                                      IconID,
                                                                      name,
                                                                      control,
                                                                      ...res
                                                                  }: ControlledInputType<TFieldValues>) => {
    const {
        field,
        fieldState: {error},
    } = useController({
        name,
        control,
    });

    return (
        <TextField
            type={type}
            label={name}
            error={error?.message}
            {...field}
            {...res}
            IconID={IconID}
        />
    );
};