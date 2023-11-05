import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './createNewPassword.module.scss'
import { Card } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { useNavigate } from 'react-router-dom'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  password: z.string().min(3),
})

export const CreateNewPassword = () => {
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
    navigate('/checkEmail')
  }

  return (
    <Card className={s.box}>
      <Typography as={'span'} className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputPassword}
          placeholder={'Create New Password'}
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          password
          inputId={'inputCreateNewPassword'}
        />
        <Typography as={'p'} className={s.text} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.button} type={'submit'} fullWidth variant={'primary'}>
          <Typography as={'span'} variant={'subtitle2'}>
            Create New Password
          </Typography>
        </Button>
      </form>
    </Card>
  )
}
