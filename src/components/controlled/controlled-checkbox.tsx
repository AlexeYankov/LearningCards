import {
    FieldValues,
    useController,
    UseControllerProps,
} from "react-hook-form";

import {CheckBox, CheckBoxProps} from "../checkbox/check-box.tsx";

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
    UseControllerProps<TFieldValues> &
    Omit<CheckBoxProps, "onChange" | "value" | "id">;

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
                                                                         IconID,
                                                                         SelectedIconID,
                                                                         name,
                                                                         rules,
                                                                         shouldUnregister,
                                                                         control,
                                                                         defaultValue,
                                                                         ...checkboxProps
                                                                     }: ControlledCheckboxProps<TFieldValues>) => {
    const {
        field: {onChange, value},
    } = useController({
        name,
        rules,
        shouldUnregister,
        control,
        defaultValue,
    });

    return (
        <CheckBox
            {...{
                setControlledBy:onChange,
                controlledBy: value,
                ...checkboxProps,
                SelectedIconID,
                IconID
            }}
        />
    );
};