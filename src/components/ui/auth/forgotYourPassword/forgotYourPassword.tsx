import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useRecoverPasswordMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/loader'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotYourPassword.module.scss'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  email: z.string().email(),
})

const html =
  '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/createNewPassword/##token##">here</a> to recover your password</p>'

export const ForgotYourPassword = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  const [sendRequest, { isLoading }] = useRecoverPasswordMutation()

  const onSubmit = (data: FormValues) => {
    const { email } = data

    sendRequest({ email, html })
      .unwrap()
      .then(() => {
        navigate(`/${email}/checkEmail`)
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }

  return (
    <>
      {isLoading && <Progress />}

      <Card className={s.forgotYourPassword}>
        <Typography className={s.label} variant={'large'}>
          {t('forgot_your_password')}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={s.inputEmail}
            errorMessage={errors.email && errors.email?.message}
            inputId={'inputEmailSignUp'}
            label={t('email')}
            placeholder={t('email')}
            type={'text'}
            {...register('email')}
          />
          <Typography as={'p'} className={s.text} variant={'body2'}>
            {t('Enter_email_address_further_instructions')}
          </Typography>
          <Button className={s.button} fullWidth type={'submit'} variant={'primary'}>
            <Typography as={'p'} variant={'subtitle2'}>
              {t('send_instructions')}
            </Typography>
          </Button>
        </form>
        <Typography as={'p'} className={s.rememberYourPassword} variant={'body2'}>
          {t('did_you_remember_your_password')}
        </Typography>
        <Button className={s.btnTryLoggingIn} variant={'link'}>
          <Typography as={Link} className={s.tryLoggingIn} to={'/login'} variant={'subtitle2'}>
            {t('try_logging_in')}
          </Typography>
        </Button>
      </Card>
    </>
  )
}
