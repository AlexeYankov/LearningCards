import s from './signUp.module.scss'
import {Typography} from "@/components/typography";
import {Button} from "@/components/button";
import {useForm} from "react-hook-form";
import {ControlledInput} from "@/components/controlled/controlled-input.tsx";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword:  z.string().min(3),

})
export const SignUp = () => {
    const {handleSubmit, control} = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    })
    const onSubmit = (data: FormValues) => {
        console.log(data)
    }
    return (
        <div className={s.signUp}>
            <Typography className={s.label} children={'Sign Up'} variant={"large"}/>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ControlledInput className={s.inputEmail} placeholder={'Email'} control={control} name={'email'}
                                 type={'text'} label={'Email'}/>
                <ControlledInput className={s.inputPassword} IconID={'eye-outline'} placeholder={'Password'}
                                 control={control} name={'password'} type={'password'} label={'Password'}/>
                <ControlledInput className={s.inputConfirmPassword} IconID={'eye-outline'}
                                 placeholder={'Confirm Password'}
                                 control={control} name={'confirmPassword'} type={'password'}
                                 label={'Confirm Password'}/>
                <Button className={s.button} type={'submit'} variant={'primary'}
                        children={<Typography children={'Sign Up'} variant={'subtitle2'}/>}/>
            </form>

            <Typography className={s.linkAlreadyHaveAccount} children={'Already have an account?'} variant={"body2"}/>
            <Typography className={s.linkSignIn} children={'Sign In'} variant={"body1"}/>
        </div>
    );
};
