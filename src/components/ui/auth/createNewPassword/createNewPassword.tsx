import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useResetPasswordMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  password: z.string().min(3).max(30),
})

export const CreateNewPassword = () => {
  const { t } = useTranslation()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  const [newPassword] = useResetPasswordMutation()
  const params = useParams<'*'>()
  const navigate = useNavigate()

  const onSubmit = (data: FormValues) => {
    const { password } = data
    const token = params['*']

    params &&
      newPassword({ password, token })
        .unwrap()
        .then(() => {
          navigate('/login')
        })
  }

  return (
    <Card className={s.box}>
      <Typography as={'span'} className={s.title} variant={'large'}>
        {t('create_new_password')}
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={s.inputPassword}
          errorMessage={errors.password && errors.password?.message}
          inputId={'inputCreateNewPassword'}
          label={t('password')}
          password
          placeholder={t('create_new_password')}
          type={'password'}
          {...register('password')}
        />
        <Typography as={'p'} className={s.text} variant={'body2'}>
          {t('Create_new_password_instructions_to_email')}
        </Typography>
        <Button className={s.button} fullWidth type={'submit'} variant={'primary'}>
          <Typography as={'span'} variant={'subtitle2'}>
            {t('create_new_password')}
          </Typography>
        </Button>
      </form>
    </Card>
  )
}
