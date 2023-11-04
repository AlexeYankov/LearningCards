import { useForm } from 'react-hook-form'

import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '../../button'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox'
import { ControlledInput } from '../../controlled/controlled-input'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export const SignIn = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className={s.signIn}>
      <Typography children={'Sign In'} className={s.label} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputEmail}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
          type={'text'}
        />
        <ControlledInput
          IconID={'eye-outline'}
          className={s.inputPassword}
          control={control}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
        <ControlledCheckbox
          IconID={'checkbox-unselected'}
          SelectedIconID={'checkbox-selected'}
          className={s.checkbox}
          control={control}
          height={'24'}
          label={'Remember me'}
          name={'rememberMe'}
          width={'24'}
        />
        <Typography children={'Forgot Password?'} className={s.forgotPassLink} variant={'body2'} />
        <Button
          children={<Typography children={'Sign In'} variant={'subtitle2'} />}
          className={s.button}
          type={'submit'}
          variant={'primary'}
        />
      </form>

      <Typography
        children={"Don't have an account?"}
        className={s.linkDontHaveAccount}
        variant={'body2'}
      />
      <Typography children={'Sign Up'} className={s.linkSignUp} variant={'body1'} />
    </div>
  )
}
