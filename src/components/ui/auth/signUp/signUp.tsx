import { useForm } from 'react-hook-form'

import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

import { Button } from '../../button'
import { ControlledInput } from '../../controlled/controlled-input'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  confirmPassword: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
})

export const SignUp = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className={s.signUp}>
      <Typography children={'Sign Up'} className={s.label} variant={'large'} />
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
        <ControlledInput
          IconID={'eye-outline'}
          className={s.inputConfirmPassword}
          control={control}
          label={'Confirm Password'}
          name={'confirmPassword'}
          placeholder={'Confirm Password'}
          type={'password'}
        />
        <Button
          children={<Typography children={'Sign Up'} variant={'subtitle2'} />}
          className={s.button}
          type={'submit'}
          variant={'primary'}
        />
      </form>

      <Typography
        children={'Already have an account?'}
        className={s.linkAlreadyHaveAccount}
        variant={'body2'}
      />
      <Typography children={'Sign In'} className={s.linkSignIn} variant={'body1'} />
    </div>
  )
}
