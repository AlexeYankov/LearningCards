import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useCreateUserMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/loader'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z
  .object({
    confirmPassword: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const SignUp = () => {
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  const [signUp, { isLoading }] = useCreateUserMutation()

  const onSubmit = (data: FormValues) => {
    const { email, password } = data

    signUp({ email, password })
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch(err => {
        toast.error(err.data.errorMessages[0])
      })
  }

  return (
    <>
      {isLoading && <Progress />}
      <Card className={s.signUp}>
        <Typography className={s.label} variant={'large'}>
          Sign Up
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            errorMessage={errors.email && errors.email?.message}
            inputId={'inputEmail'}
            label={'Email'}
            placeholder={'Email'}
            type={'text'}
            {...register('email')}
          />
          <TextField
            errorMessage={errors.password && errors.password?.message}
            inputId={'inputPassword'}
            label={'Password'}
            password
            placeholder={'Password'}
            type={'password'}
            {...register('password')}
          />
          <TextField
            className={s.inputConfirmPassword}
            errorMessage={errors.confirmPassword && errors.confirmPassword?.message}
            inputId={'inputConfirmPassword'}
            label={'Confirm Password'}
            password
            placeholder={'Confirm Password'}
            type={'password'}
            {...register('confirmPassword')}
          />
          <Button className={s.button} disabled={isLoading} type={'submit'} variant={'primary'}>
            <Typography as={'p'} variant={'subtitle2'}>
              Sign Up
            </Typography>
          </Button>
        </form>

        <Typography as={'p'} className={s.linkAlreadyHaveAccount} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button className={s.btnSignIn} type={'button'} variant={'link'}>
          <Typography as={Link} className={s.linkSignIn} to={'/login'} variant={'subtitle2'}>
            Sign In
          </Typography>
        </Button>
      </Card>
    </>
  )
}
