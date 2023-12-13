import * as RadioGroup from '@radix-ui/react-radio-group';
import * as RadioGroupLib from '@radix-ui/react-radio-group';
import s from './radio.module.scss'
import {ComponentPropsWithoutRef, ElementRef, forwardRef} from "react";
import {Label} from "@/components/ui/label";
import {Typography} from "@/components/ui/typography";

type Option = {
    value: string | number;
    key?: number | string;
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>;
export type RadioGroupPropsType = RadioGroupLib.RadioGroupProps & {
    options: Option[];
    disabled?: boolean;
    defaultValue?: string;
    errorMessage?: string
    className?: string
    onChange?: (value: any) => void
    value?: string

};
export const Radio = forwardRef<
    ElementRef<typeof RadioGroupLib.Root>,
    RadioGroupPropsType
>(
    (
        {
            value,
            onChange,
            errorMessage,
            options,
            disabled = false,
            className,
        }: RadioGroupPropsType,
        ref
    ) => {
        return (
            <RadioGroup.Root onValueChange={onChange} value={value} className={`${s.RadioGroupRoot} ${className}`}
                             disabled={disabled} ref={ref}>
                {options?.map((el) => {
                    return (
                        <div key={el.value} className={s.RadioGroupBlock}>
                            <RadioGroup.Item className={s.RadioGroupItem} value={`${el.value}`}>
                                <RadioGroup.Indicator className={s.RadioGroupIndicator}/>
                            </RadioGroup.Item>
                            <Label className={s.Label} label={`${el.value}`}/>
                        </div>
                    )
                })}
                {errorMessage && (
                    <Typography>
                        {errorMessage}
                    </Typography>
                )}
            </RadioGroup.Root>
        );
    }
)

