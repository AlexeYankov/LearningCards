import s from './signIn.module.scss'
import { Typography } from '@/components/ui/typography'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '../../controlled/controlled-input'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox'
import { Button } from '../../button'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})
export const SignIn = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className={s.signIn}>
      <Typography className={s.label} children={'Sign In'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputEmail}
          placeholder={'Email'}
          control={control}
          name={'email'}
          type={'text'}
          label={'Email'}
        />
        <ControlledInput
          className={s.inputPassword}
          IconID={'eye-outline'}
          placeholder={'Password'}
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
        />
        <ControlledCheckbox
          control={control}
          name={'rememberMe'}
          className={s.checkbox}
          IconID={'checkbox-unselected'}
          width={'24'}
          height={'24'}
          SelectedIconID={'checkbox-selected'}
          label={'Remember me'}
        />
        <Typography className={s.forgotPassLink} children={'Forgot Password?'} variant={'body2'} />
        <Button
          className={s.button}
          type={'submit'}
          variant={'primary'}
          children={<Typography children={'Sign In'} variant={'subtitle2'} />}
        />
      </form>

      <Typography
        className={s.linkDontHaveAccount}
        children={"Don't have an account?"}
        variant={'body2'}
      />
      <Typography className={s.linkSignUp} children={'Sign Up'} variant={'body1'} />
    </div>
  )
}
