import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/ui/auth/forgotYourPassword/forgotYourPassword.module.scss'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  email: z.string().email(),
})

export const ForgotYourPassword = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
    navigate('/createNewPassword')
  }
  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <Card className={s.forgotYourPassword}>
      <Typography children={'Forgot your password?'} className={s.label} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          control={control}
          inputId={'inputEmailSignUp'}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
          type={'text'}
        />
        <Typography as={'p'} className={s.text} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button
          children={<Typography as={'p'} children={'Send Instructions'} variant={'subtitle2'} />}
          className={s.button}
          fullWidth
          type={'submit'}
          variant={'primary'}
        />
        <Typography
          as={'p'}
          children={'Did you remember your password?'}
          className={s.rememberYourPassword}
          variant={'body2'}
        />
        <Button
          children={<Typography as={'span'} children={'Try logging in'} variant={'subtitle2'} />}
          className={s.tryLoggingIn}
          onClick={goToLogin}
          type={'button'}
          variant={'link'}
        />
      </form>
    </Card>
  )
}
