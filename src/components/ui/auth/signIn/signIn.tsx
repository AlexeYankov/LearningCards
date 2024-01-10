import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckBox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/loader'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().nonempty('Field is required').email(),
  password: z.string().nonempty('Field is required').min(3),
})

export const SignIn = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  const [login, { isLoading }] = useLoginMutation()
  const [isPrivate, setIsPrivate] = useState(false)

  const handeCheckedChange = () => {
    setIsPrivate(prevState => !prevState)
  }

  const onSubmit = (data: FormValues) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        toast.error('Incorrect login or password')
      })
  }

  return (
    <>
      {isLoading && <Progress />}
      <Card className={s.signIn}>
        <Typography className={s.label} variant={'large'}>
          {t('sign_in')}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            errorMessage={errors.email && errors.email?.message}
            inputId={'inputEmailSignUp'}
            label={'Email'}
            placeholder={'Email'}
            type={'text'}
            {...register('email')}
          />
          <TextField
            errorMessage={errors.password && errors.password?.message}
            inputId={'inputPasswordSignUp'}
            label={'Password'}
            password
            placeholder={'Password'}
            type={'password'}
            {...register('password')}
          />
          <div className={s.checkboxContainer}>
            <CheckBox
              IconID={'checkbox-unselected'}
              SelectedIconID={'checkbox-selected'}
              checked={isPrivate}
              className={s.checkbox}
              height={'24'}
              label={t('remember_me')}
              onChange={handeCheckedChange}
              width={'24'}
            />
          </div>
          <div className={s.linkContainer}>
            <Typography
              as={Link}
              className={s.forgotPassLink}
              to={'/forgotYourPassword'}
              variant={'body2'}
            >
              {t('forgot_password')}
            </Typography>
          </div>
          <Button
            className={s.button}
            disabled={isSubmitting || isLoading}
            type={'submit'}
            variant={'primary'}
          >
            <Typography as={'p'} variant={'subtitle2'}>
              {t('sign_in')}
            </Typography>
          </Button>
        </form>

        <Typography as={'p'} className={s.linkDontHaveAccount} variant={'body2'}>
          {t(`don't_have_an_account?`)}
        </Typography>
        <Button className={s.btnSignUp} type={'button'} variant={'link'}>
          <Typography as={Link} className={s.linkSignUp} to={'/signUp'} variant={'subtitle2'}>
            {t('sign_up')}
          </Typography>
        </Button>
      </Card>
    </>
  )
}
