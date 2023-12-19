import s from './signUp.module.scss'
import { Typography } from '@/components/ui/typography'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '../../controlled/controlled-input'
import { Button } from '../../button'
import { Card } from '@/components/ui/card'
import { Link, Navigate } from 'react-router-dom'
import { useCreateUserMutation } from '@/api/auth-api/auth.api.ts'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3).max(30),
    confirmPassword: z.string().min(3).max(30),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
export const SignUp = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const [signUp, { isSuccess }] = useCreateUserMutation()
  if (isSuccess) return <Navigate to={'/login'} />
  const onSubmit = (data: FormValues) => {
    const { email, password } = data
    signUp({ email, password })
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
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth
          children={<Typography children={'Sign Up'} variant={'subtitle2'} as={'p'} />}
        />
      </form>

      <Typography
        className={s.linkAlreadyHaveAccount}
        children={'Already have an account?'}
        variant={'body2'}
        as={'p'}
      />
      <Button
        className={s.btnSignIn}
        type={'button'}
        variant={'link'}
        children={
          <Typography
            className={s.linkSignIn}
            children={'Sign In'}
            variant={'subtitle2'}
            as={Link}
            to={'/login'}
          />
        }
      />
    </Card>
  )
}
