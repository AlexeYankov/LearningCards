import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Card } from '@/components/ui/card'
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
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<FormValues>({
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
      <Typography children={'Sign Up'} className={s.label} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          control={control}
          inputId={'inputEmail'}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
          type={'text'}
        />
        <ControlledInput
          control={control}
          inputId={'inputPassword'}
          label={'Password'}
          name={'password'}
          password
          placeholder={'Password'}
          type={'password'}
        />
        <ControlledInput
          className={s.inputConfirmPassword}
          control={control}
          inputId={'inputConfirmPassword'}
          label={'Confirm Password'}
          name={'confirmPassword'}
          password
          placeholder={'Confirm Password'}
          type={'password'}
        />
        <Button
          children={<Typography children={'Sign Up'} variant={'subtitle2'} />}
          className={s.button}
          fullWidth
          type={'submit'}
          variant={'primary'}
        />
      </form>

      <Typography
        as={'p'}
        children={'Already have an account?'}
        className={s.linkAlreadyHaveAccount}
        variant={'body2'}
      />
      <Button
        children={<Typography as={'p'} children={'Sign In'} ography variant={'subtitle2'} />}
        className={s.linkSignIn}
        onClick={goToLogin}
        type={'button'}
        variant={'link'}
      />
    </Card>
  )
}
