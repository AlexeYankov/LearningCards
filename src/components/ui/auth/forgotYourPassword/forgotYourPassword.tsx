import s from '@/components/ui/auth/forgotYourPassword/forgotYourPassword.module.scss'
import { ControlledInput } from '@/components/ui/controlled/controlled-input.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { z } from 'zod'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  email: z.string().email(),
})
export const ForgotYourPassword = () => {
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
    navigate('/checkEmail')
  }
  const goToLogin = () => {
    navigate('/login')
  }
  return (
    <Card className={s.forgotYourPassword}>
      <Typography className={s.label} children={'Forgot your password?'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          placeholder={'Email'}
          control={control}
          name={'email'}
          type={'text'}
          label={'Email'}
          inputId={'inputEmailSignUp'}
        />
        <Typography as={'p'} className={s.text} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button
          className={s.button}
          type={'submit'}
          variant={'primary'}
          fullWidth
          children={<Typography children={'Send Instructions'} variant={'subtitle2'} as={'p'} />}
        />
        <Typography
          className={s.rememberYourPassword}
          children={'Did you remember your password?'}
          variant={'body2'}
          as={'p'}
        />
        <Button
          className={s.tryLoggingIn}
          type={'button'}
          variant={'link'}
          onClick={goToLogin}
          children={<Typography children={'Try logging in'} variant={'subtitle2'} as={'span'} />}
        />
      </form>
    </Card>
  )
}
