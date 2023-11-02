import * as RadioGroup from '@radix-ui/react-radio-group';
import s from './radio.module.scss'
import {ComponentPropsWithoutRef} from "react";
import * as RadioGroupLib from "@radix-ui/react-radio-group";
import {Label} from "@/components/ui/label";

type Option = {
    value: string;
    key?: number | string;
} & ComponentPropsWithoutRef<"input">;
export type RadioGroupPropsType = RadioGroupLib.RadioGroupProps & {
    options: Option[];
    disabled?: boolean;
    defaultValue?: string;
};
export const Radio = ({options,disabled}: RadioGroupPropsType,) => {
    return (
        <RadioGroup.Root className={s.RadioGroupRoot} disabled={disabled}>
            {options?.map((el) => {
                return (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <RadioGroup.Item className={s.RadioGroupItem} key={el.key} value={el.value}>
                            <RadioGroup.Indicator className={s.RadioGroupIndicator}/>
                        </RadioGroup.Item>
                        <Label className={s.Label}  label={'Compact'}/>
                    </div>
                )
            })}

        </RadioGroup.Root>
    );
};

