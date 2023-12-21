import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import s from './createNewPassword.module.scss'
import { useResetPasswordMutation } from '@/api/auth'
import { useNavigate, useParams } from 'react-router-dom'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  password: z.string().min(3).max(30),
})

export const CreateNewPassword = () => {
  const { control, handleSubmit } = useForm<FormValues>({
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
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputPassword}
          control={control}
          inputId={'inputCreateNewPassword'}
          label={'Password'}
          name={'password'}
          password
          placeholder={'Create New Password'}
          type={'password'}
        />
        <Typography as={'p'} className={s.text} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.button} fullWidth type={'submit'} variant={'primary'}>
          <Typography as={'span'} variant={'subtitle2'}>
            Create New Password
          </Typography>
        </Button>
      </form>
    </Card>
  )
}
