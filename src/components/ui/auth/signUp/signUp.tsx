import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
          {t('sign_up')}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            errorMessage={errors.email && errors.email?.message}
            inputId={'inputEmail'}
            label={t('email')}
            placeholder={t('email')}
            type={'text'}
            {...register('email')}
          />
          <TextField
            errorMessage={errors.password && errors.password?.message}
            inputId={'inputPassword'}
            label={t('password')}
            password
            placeholder={t('password')}
            type={'password'}
            {...register('password')}
          />
          <TextField
            className={s.inputConfirmPassword}
            errorMessage={errors.confirmPassword && errors.confirmPassword?.message}
            inputId={'inputConfirmPassword'}
            label={t('confirm_password')}
            password
            placeholder={t('confirm_password')}
            type={'password'}
            {...register('confirmPassword')}
          />
          <Button className={s.button} disabled={isLoading} type={'submit'} variant={'primary'}>
            <Typography as={'p'} variant={'subtitle2'}>
              {t('sign_up')}
            </Typography>
          </Button>
        </form>

        <Typography as={'p'} className={s.linkAlreadyHaveAccount} variant={'body2'}>
          {t('already_have_an_account')}
        </Typography>
        <Button className={s.btnSignIn} type={'button'} variant={'link'}>
          <Typography as={Link} className={s.linkSignIn} to={'/login'} variant={'subtitle2'}>
            {t('sign_in')}
          </Typography>
        </Button>
      </Card>
    </>
  )
}
