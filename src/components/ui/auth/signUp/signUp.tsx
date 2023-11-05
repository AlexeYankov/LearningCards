import { useForm } from 'react-hook-form'

import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

import { Button } from '../../button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  confirmPassword: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
})

export const SignUp = () => {
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
    navigate('/login')
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <Card className={s.signUp}>
      <Typography className={s.label} children={'Sign Up'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          placeholder={'Email'}
          control={control}
          name={'email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmail'}
        />
        <ControlledInput
          placeholder={'Password'}
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputPassword'}
        />
        <ControlledInput
          className={s.inputConfirmPassword}
          placeholder={'Confirm Password'}
          control={control}
          name={'confirmPassword'}
          type={'password'}
          label={'Confirm Password'}
          password
          inputId={'inputConfirmPassword'}
        />
        <Button
          children={<Typography children={'Sign Up'} variant={'subtitle2'} />}
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth
          children={<Typography children={'Sign Up'} variant={'subtitle2'} as={'p'} />}
        />
      </form>

      <Typography
        children={'Already have an account?'}
        className={s.linkAlreadyHaveAccount}
        variant={'body2'}
        as={'p'}
      />
      < className={s.linkSignIn}
        type={'button'}
        variant={'link'}
        children={<TypButton
       ography children={'Sign In'} variant={'subtitle2'} as={'p'} />}
        onClick={goToLogin}
      />
    </Card>
  )
}
