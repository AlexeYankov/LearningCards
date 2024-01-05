import s from './signUp.module.scss'
import { Typography } from '@/components/ui/typography'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateUserMutation } from '@/api/auth'
import { TextField } from '@/components/ui/textField'

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
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      confirmPassword: '',
      password: '',
    },
  })

  const [signUp] = useCreateUserMutation()

  const onSubmit = (data: FormValues) => {
    const { email, password } = data
    signUp({ email, password }).then(() => {
      navigate('/login')
    })
  }
  return (
    <Card className={s.signUp}>
      <Typography className={s.label} children={'Sign Up'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder={'Email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmail'}
          errorMessage={errors.email && errors.email?.message}
          {...register('email')}
        />
        <TextField
          placeholder={'Password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputPassword'}
          errorMessage={errors.password && errors.password?.message}
          {...register('password')}
        />
        <TextField
          className={s.inputConfirmPassword}
          placeholder={'Confirm Password'}
          type={'password'}
          label={'Confirm Password'}
          password
          inputId={'inputConfirmPassword'}
          errorMessage={errors.confirmPassword && errors.confirmPassword?.message}
          {...register('confirmPassword')}
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
