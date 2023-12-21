import s from '@/components/ui/auth/forgotYourPassword/forgotYourPassword.module.scss'
import { ControlledInput } from '@/components/ui/controlled/controlled-input.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { z } from 'zod'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useRecoverPasswordMutation } from '@/api/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '@/components/ui/loader'

type FormValues = z.infer<typeof loginSchema>
const loginSchema = z.object({
  email: z.string().email(),
})

const html =
  '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/createNewPassword/##token##">here</a> to recover your password</p>'
export const ForgotYourPassword = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const [sendRequest, { isLoading }] = useRecoverPasswordMutation()
  if (isLoading) return <Loader />
  const onSubmit = (data: FormValues) => {
    const { email } = data
    sendRequest({ email, html })
      .unwrap()
      .then(() => {
        navigate(`/${email}/checkEmail`)
      })
  }
  return (
    <Card className={s.forgotYourPassword}>
      <Typography className={s.label} children={'Forgot your password?'} variant={'large'} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          className={s.inputEmail}
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
      </form>
      <Typography
        className={s.rememberYourPassword}
        children={'Did you remember your password?'}
        variant={'body2'}
        as={'p'}
      />
      <Button className={s.btnTryLoggingIn} variant={'link'}>
        <Typography className={s.tryLoggingIn} as={Link} to={'/login'} variant={'subtitle2'}>
          Try logging in
        </Typography>
      </Button>
    </Card>
  )
}
