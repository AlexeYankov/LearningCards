import s from "@/components/ui/auth/forgotYourPassword/forgotYourPassword.module.scss";
import {ControlledInput} from "@/components/ui/controlled/controlled-input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card} from "@/components/ui/card";
import {z} from "zod";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
    email: z.string().email(),
})
export const ForgotYourPassword = () => {
    const {handleSubmit, control} = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    })
    const onSubmit = (data: FormValues) => {
        console.log(data)
    }
    return (
        <Card className={s.forgotYourPassword}>
            <Typography className={s.label} children={'Forgot your password?'} variant={'large'}/>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ControlledInput
                    className={s.inputEmail}
                    placeholder={'Email'}
                    control={control}
                    name={'email'}
                    type={'text'}
                    label={'Email'}
                    inputId={'inputEmailSignUp'}
                />
                <Typography as={'p'} className={s.text} variant={'body2'}>
                    Enter your email address and we will send you further instructions
                </Typography>
                <Button
                    className={s.button}
                    type={'submit'}
                    variant={'primary'}
                    fullWidth
                    children={<Typography children={'Send Instructions'} variant={'subtitle2'} as={'p'}/>}
                />
                <Typography
                    className={s.rememberYourPassword}
                    children={"Did you remember your password?"}
                    variant={'body2'}
                    as={'p'}
                />
                <Typography className={s.tryLoggingIn} as={'span'} variant={'subtitle2'}>
                    Try logging in
                </Typography>
            </form>


        </Card>
    );
};
